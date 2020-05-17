import React, { useCallback, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './conventerPage.sass'
import { AppStateType } from '../../stateManager/redux-store'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentValutes, selectViseValutes, inputValute } from '../../stateManager/valutes-reducer'
import { getValutesAPIType } from '../../api/api'
export const ConvertorPage = () => {

    /* ===UseState=== */
    let [classesActive, setClassesActive] = useState<string[]>(['valute-list_wrapper'])
    let [classesPasive, setClassesPasive] = useState<string[]>(['valute-list_wrapper'])
    let [inputValue, setInputValue] = useState<string>('1')
    let [inputValueResult, setInputValueResult] = useState('1')
    /* ===UseSelector=== */
    const currentValutes = useSelector((state: AppStateType) => state.valutesReducer.currentValutes)
    const isSelectValuteActive = useSelector((state: AppStateType) => state.valutesReducer.isSelectValuteActive)
    const isSelectValutePasive = useSelector((state: AppStateType) => state.valutesReducer.isSelectValutePasive)
    // const inputValue = useSelector((state: AppStateType) => state.valutesReducer.inputValue)
    /* ===UseDispatch=== */
    const dispatch = useDispatch()

    /* ===For Active Valutes=== */
    const selectValutesActiveCB = useCallback((item: getValutesAPIType) => {
        dispatch(selectCurrentValutes(item))
    }, [dispatch])

    const onSelectValutesActive = (item: getValutesAPIType) => {
        return () => {
            selectValutesActiveCB(item)
            setClassesActive(() => {
                let index = classesActive.indexOf('open')
                return index > -1 ? classesActive.splice(index - 1, 1) : classesActive
            })
        }
    }

    const toggleMenuActive = () => {
        classesPasive.includes('open') && classesPasive.splice(1, 1)
        setClassesActive(() => {
            let index = classesActive.indexOf('open')
            return index > -1 ? classesActive.splice(index - 1, 1) : [...classesActive, 'open']
        })
    }

    let signOfValutesActive = currentValutes?.map(item => {
        return <li className="list-item" onClick={onSelectValutesActive(item)} key={item.ccy}>{item.ccy}</li>
    })


    const inputValueChangeActive = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
        setInputValueResult(String(((Number(isSelectValuteActive?.sale) | Number(currentValutes![0].sale))/(Number(isSelectValutePasive?.sale) | Number(currentValutes![1].sale))*Number(e.currentTarget.value)).toFixed(2)))
    }

    const inputValueChangePasive = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValueResult(e.currentTarget.value)
        setInputValue(String(((Number(isSelectValutePasive?.sale) | Number(currentValutes![1].sale))/(Number(isSelectValuteActive?.sale) | Number(currentValutes![0].sale))*Number(e.currentTarget.value)).toFixed(2)))
    }

    /* ===For Pasive Valutes=== */
    const selectValutesPasiveCB = useCallback((item: getValutesAPIType) => {
        dispatch(selectViseValutes(item))
    }, [dispatch])

    const onSelectValutesPasive = (item: getValutesAPIType) => {
        return () => {
            selectValutesPasiveCB(item)
            setClassesPasive(() => {
                let index = classesPasive.indexOf('open')
                return index > -1 ? classesPasive.splice(index - 1, 1) : classesPasive
            })
        }
    }

    const toggleMenuPasive = () => {
        classesActive.includes('open') && classesActive.splice(1, 1)
        setClassesPasive(() => {
            let index = classesPasive.indexOf('open')
            return index > -1 ? classesPasive.splice(index - 1, 1) : [...classesPasive, 'open']
        })
    }

    let signOfValutesPasive = currentValutes?.map(item => {
        return <li className="list-item" onClick={onSelectValutesPasive(item)} key={item.ccy}>{item.ccy}</li>
    })


    return (

        <div className="conventerValutesPage">
            <NavLink to="/currentCurses" className="btn">Current Curses</NavLink>
            <div className="conventer-form">
                <div className="currentValue-valute"></div>
                <div className="conventer-form_wrapper">
                    <div className="form-col form-col_active">
                        <div className="active-valute_number">
                            <input type="number" name="" min="0" value={inputValue} onChange={inputValueChangeActive} />
                        </div>
                        <div className="active-valute_sign">
                            <ul className="valute-list">
                                <span onClick={toggleMenuActive}>{isSelectValuteActive?.ccy || currentValutes![0].ccy}</span>
                                <div className={classesActive.join(' ')}>{signOfValutesActive}</div>
                            </ul>
                        </div>
                    </div>
                    <div className="form-col form-col_pasive">
                        <div className="pasive-valute_number">
                            <input type="number" name="" min="0" value={inputValueResult} onChange={inputValueChangePasive}/>
                        </div>
                        <div className="pasive-valute_sign">
                            <ul className="valute-list"><span onClick={toggleMenuPasive}>{isSelectValutePasive?.ccy || currentValutes![1].ccy}</span>
                                <div className={classesPasive.join(' ')}>{signOfValutesPasive}</div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}