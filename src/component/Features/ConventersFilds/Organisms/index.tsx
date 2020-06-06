import React, { useState, SetStateAction } from 'react'
import {Input} from '../../../UI/Atoms/Input'
import './style.sass'

type PropsType = {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    valuteCCY: string | undefined
    valutes: any
    classMenuOne: string[],
    classMenuTwo: string[],
    setClassForMenu: (value: SetStateAction<string[]>) => void
    classesForDiv: string[]
}
export const RowConvertValute:React.FC<PropsType> = ({value, onChange, valuteCCY, valutes, classMenuOne, classMenuTwo, setClassForMenu, classesForDiv}) => {


    const toggleMenu = (
		classesModeOne: string[],
		classesModeTwo: string[],
		setClasses: (
			value: React.SetStateAction<string[]>
		) => void
	) => {
		classesModeOne.includes('open') &&
			classesModeOne.splice(1, 1)
		setClasses(() => {
			let index = classesModeTwo.indexOf('open')
			return index > -1
				? classesModeTwo.splice(index - 1, 1)
				: [...classesModeTwo, 'open']
		})
    }
    

    return (
       <>
                <div className="form-col">
                    <div className='valute_number'>
                        <Input
                            type={'number'}
                            inputProps={{ min: '0' }}
                            value={value}
                            onChange={onChange}
                            color={'secondary'}
                            placeholder={'valute'}
                        />
                    </div>
                    <div className='valute_sign'>
                        <ul className='valute-list'>
                            <span
                                onClick={() =>
                                    toggleMenu(
                                        classMenuOne,
                                        classMenuTwo,
                                        setClassForMenu
                                    )
                                }
                            >
                                {valuteCCY}
                            </span>
                            <div className={classesForDiv.join(' ')}>
                                {valutes}
                            </div>
                        </ul>
                    </div>
                </div>
       </>
    )
}