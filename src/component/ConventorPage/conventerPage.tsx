import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import './conventerPage.sass'
import '././../common/button/button.sass'
import { AppStateType } from '../../stateManager/redux-store'
import { useSelector, useDispatch } from 'react-redux'
import { Actions, ActionsType } from '../../stateManager/valutes-reducer'
import { getValutesAPIType } from '../../api/api'
import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'
const ConvertorPage: React.FC = () => {

    /* ===UseState=== */
    let [classesActive, setClassesActive] = useState<string[]>(['valute-list_wrapper'])
    let [classesPasive, setClassesPasive] = useState<string[]>(['valute-list_wrapper'])
    let [inputValueResultActive, setInputValueResultActive] = useState<string>('0')
    let [inputValueResultPasive, setInputValueResultPasive] = useState<string>('0')

    /* ===UseSelector=== */
    const currentValutes = useSelector((state: AppStateType) => state.valutesReducer.currentValutes)
    let isSelectValuteActive = useSelector((state: AppStateType) => state.valutesReducer.isSelectValuteActive)
    let isSelectValutePasive = useSelector((state: AppStateType) => state.valutesReducer.isSelectValutePasive)

    /* ===UseDispatch=== */
    const dispatch = useDispatch()

    if (currentValutes) {
        if (!isSelectValuteActive) isSelectValuteActive = currentValutes[0]
        if (!isSelectValutePasive) isSelectValutePasive = currentValutes[1]
    }

    const selectValutes = (item: getValutesAPIType | null, selectName: (item: getValutesAPIType | null) => ActionsType) => {
        return dispatch(selectName(item))
    }

    const onSelectValutes = (classesMode: string[], itemOfConditionActive: getValutesAPIType | null, itemOfConditionPasive: getValutesAPIType | null, setClasses: (value: React.SetStateAction<string[]>) => void, selectValutesOne: (item: getValutesAPIType | null) => ActionsType, selectValutesTwo: (item: getValutesAPIType | null) => ActionsType) => {
        return () => {
            selectValutes(itemOfConditionActive, selectValutesOne)
            selectValutes(itemOfConditionPasive, selectValutesTwo)
            setClasses(() => {
                let index = classesMode.indexOf('open')
                return index > -1 ? classesMode.splice(index - 1, 1) : classesMode
            })
        }
    }

    const toggleMenu = (classesModeOne: string[], classesModeTwo: string[], setClasses: (value: React.SetStateAction<string[]>) => void) => {
        classesModeOne.includes('open') && classesModeOne.splice(1, 1)
        setClasses(() => {
            let index = classesModeTwo.indexOf('open')
            return index > -1 ? classesModeTwo.splice(index - 1, 1) : [...classesModeTwo, 'open']
        })
    }

    const signOfValutesActive = currentValutes?.map(item => {
        return <li className="list-item" onClick={onSelectValutes(classesActive, item?.ccy === isSelectValutePasive?.ccy ? isSelectValutePasive : item, item?.ccy === isSelectValutePasive?.ccy ? isSelectValuteActive : isSelectValutePasive, setClassesActive, Actions.selectCurrentValutes, Actions.selectViseValutes)} key={item.ccy}>{item.ccy}</li>
    })

    const signOfValutesPasive = currentValutes?.map(item => {
        return <li className="list-item" onClick={onSelectValutes(classesPasive, item?.ccy === isSelectValuteActive?.ccy ? isSelectValutePasive : isSelectValuteActive, item?.ccy === isSelectValuteActive?.ccy ? isSelectValuteActive : item, setClassesPasive, Actions.selectCurrentValutes, Actions.selectViseValutes)} key={item.ccy}>{item.ccy}</li>
    })

    const inputValueChange = (inputText: string, inputNumber: string) => {
        setInputValueResultActive(inputText)
        setInputValueResultPasive(inputNumber)
    }
    useEffect(() => {
        setInputValueResultPasive(String((Number(isSelectValuteActive?.sale) / Number(isSelectValutePasive?.sale) * Number(inputValueResultActive)).toFixed(2)))
    }, [isSelectValutePasive?.ccy, isSelectValuteActive?.ccy])



    if (!currentValutes) return <div>Loading...</div>

    return (

        <div className="conventerValutesPage">
            <NavLink to="/currentCurses">
                <Button variant="outlined" color="secondary">
                    Current Valutes
                </Button>
            </NavLink>
            <div className="conventer-form">
                <div className="currentValue-valute">
                    <span>1 {isSelectValuteActive?.ccy} = {((Number(isSelectValuteActive?.sale) / Number(isSelectValutePasive?.sale)).toFixed(2))} {isSelectValutePasive?.ccy}</span>
                </div>
                <div className="conventer-form_wrapper">
                    <div className="form-col form-col_active">
                        <div className="active-valute_number">
                            <TextField type="number" inputProps={{ min: "0" }} value={inputValueResultActive} onChange={
                                (e: React.ChangeEvent<HTMLInputElement>) => {
                                    return inputValueChange(e.currentTarget.value, String((Number(isSelectValuteActive?.sale) / Number(isSelectValutePasive?.sale) * Number(e.currentTarget.value)).toFixed(2)))
                                }
                            } placeholder="valute" color="secondary" />
                        </div>
                        <div className="active-valute_sign">
                            <ul className="valute-list">
                                <span onClick={() => toggleMenu(classesPasive, classesActive, setClassesActive)}>{isSelectValuteActive?.ccy}</span>
                                <div className={classesActive.join(' ')}>{signOfValutesActive}</div>
                            </ul>
                        </div>
                    </div>
                    <div className="form-col form-col_pasive">
                        <div className="pasive-valute_number">
                            <TextField type="number" inputProps={{ min: "0" }} value={inputValueResultPasive} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                return inputValueChange(String((Number(isSelectValutePasive?.sale) / Number(isSelectValuteActive?.sale) * Number(e.currentTarget.value)).toFixed(2)), e.currentTarget.value)
                            }} color="secondary" placeholder="valute" />
                        </div>
                        <div className="pasive-valute_sign">
                            <ul className="valute-list">
                                <span onClick={() => toggleMenu(classesActive, classesPasive, setClassesPasive)}>{isSelectValutePasive?.ccy}</span>
                                <div className={classesPasive.join(' ')}>{signOfValutesPasive}</div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConvertorPage