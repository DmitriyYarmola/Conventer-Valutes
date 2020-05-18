import React, { useCallback, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import './conventerPage.sass'
import { AppStateType } from '../../stateManager/redux-store'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentValutes, selectViseValutes } from '../../stateManager/valutes-reducer'
import { getValutesAPIType } from '../../api/api'
export const ConvertorPage = () => {

    /* ===UseState=== */
    let [classesActive, setClassesActive] = useState<string[]>(['valute-list_wrapper'])
    let [classesPasive, setClassesPasive] = useState<string[]>(['valute-list_wrapper'])
    let [inputValueResultActive, setInputValueResultActive] = useState<string>('0')
    let [inputValueResultPasive, setInputValueResultPasive] = useState('0')
    /* ===UseSelector=== */
    const currentValutes = useSelector((state: AppStateType) => state.valutesReducer.currentValutes)
    let isSelectValuteActive = useSelector((state: AppStateType) => state.valutesReducer.isSelectValuteActive)
    let isSelectValutePasive = useSelector((state: AppStateType) => state.valutesReducer.isSelectValutePasive)
    // const inputValue = useSelector((state: AppStateType) => state.valutesReducer.inputValue)
    /* ===UseDispatch=== */
    const dispatch = useDispatch()

    /* ===For Active Valutes=== */
    const selectValutesActiveCB = useCallback((item: getValutesAPIType | null) => {
        dispatch(selectCurrentValutes(item))
    }, [dispatch])

    const onSelectValutesActive = (item: getValutesAPIType | null) => {
        return () => {
            selectValutesPasiveCB(item?.ccy === isSelectValutePasive?.ccy ? isSelectValuteActive : isSelectValutePasive)
            selectValutesActiveCB(item?.ccy === isSelectValutePasive?.ccy ? isSelectValutePasive : item)
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
        setInputValueResultActive(e.currentTarget.value)
        setInputValueResultPasive(String((Number(isSelectValuteActive?.sale) / Number(isSelectValutePasive?.sale) * Number(e.currentTarget.value)).toFixed(2)))
    }

    /* ===For Pasive Valutes=== */
    const selectValutesPasiveCB = useCallback((item: getValutesAPIType | null) => {
        dispatch(selectViseValutes(item))
    }, [dispatch])

    const onSelectValutesPasive = (item: getValutesAPIType | null) => {

        return () => {
            selectValutesPasiveCB(item?.ccy === isSelectValuteActive?.ccy ? isSelectValuteActive : item)
            selectValutesActiveCB(item?.ccy === isSelectValuteActive?.ccy ? isSelectValutePasive : isSelectValuteActive)
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

    const inputValueChangePasive = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValueResultPasive(e.currentTarget.value)
        setInputValueResultActive(String((Number(isSelectValutePasive?.sale) / Number(isSelectValuteActive?.sale) * Number(e.currentTarget.value)).toFixed(2)))
    }

    if (currentValutes) {
        if (!isSelectValuteActive) isSelectValuteActive = currentValutes[0]
        if (!isSelectValutePasive) isSelectValutePasive = currentValutes[1]
    }

    useEffect(() => {
        setInputValueResultActive(String((Number(isSelectValutePasive?.sale) / Number(isSelectValuteActive?.sale) * Number(inputValueResultPasive)).toFixed(2)))
    }, [isSelectValutePasive?.ccy])

    useEffect(() => {
        setInputValueResultPasive(String((Number(isSelectValuteActive?.sale) / Number(isSelectValutePasive?.sale) * Number(inputValueResultActive)).toFixed(2)))
    })


    if (!currentValutes) return <div>Loading...</div>

    return (

        <div className="conventerValutesPage">
            <NavLink to="/currentCurses" className="btn">Current Curses</NavLink>
            <div className="conventer-form">
                <div className="currentValue-valute"></div>
                <div className="conventer-form_wrapper">
                    <div className="form-col form-col_active">
                        <div className="active-valute_number">
                            <input type="number" name="" min="0" value={inputValueResultActive} onChange={inputValueChangeActive} />
                        </div>
                        <div className="active-valute_sign">
                            <ul className="valute-list">
                                <span onClick={toggleMenuActive}>{isSelectValuteActive?.ccy}</span>
                                <div className={classesActive.join(' ')}>{signOfValutesActive}</div>
                            </ul>
                        </div>
                    </div>
                    <div className="form-col form-col_pasive">
                        <div className="pasive-valute_number">
                            <input type="number" name="" min="0" value={inputValueResultPasive} onChange={inputValueChangePasive} />
                        </div>
                        <div className="pasive-valute_sign">
                            <ul className="valute-list">
                                <span onClick={toggleMenuPasive}>{isSelectValutePasive?.ccy}</span>
                                <div className={classesPasive.join(' ')}>{signOfValutesPasive}</div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}