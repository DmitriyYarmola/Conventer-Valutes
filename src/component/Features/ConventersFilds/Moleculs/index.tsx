import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppStateType } from '../../../../stateManager/redux-store'
import { getValutesAPIType } from '../../../../api/api'
import { ActionsType, Actions } from '../../../../stateManager/valutes-reducer'

type PropsType = {
    classes: string[]
    isSelectValuteOne: getValutesAPIType | null
    isSelectValuteTwo: getValutesAPIType | null
    setClasses: React.Dispatch<React.SetStateAction<string[]>>
}
export const GenerateLists:React.FC<PropsType> = ({classes, isSelectValuteOne, isSelectValuteTwo, setClasses}) => {

    const currentValutes = useSelector((state: AppStateType) => state.valutesReducer.currentValutes)
    
    const dispatch = useDispatch()
    
    const selectValutes = (
		item: getValutesAPIType | null,
		selectName: (
			item: getValutesAPIType | null
		) => ActionsType
	) => {
		return dispatch(selectName(item))
	}

	const onSelectValutes = (
		classesMode: string[],
		itemOfConditionActive: getValutesAPIType | null,
		itemOfConditionPasive: getValutesAPIType | null,
		setClasses: (
			value: React.SetStateAction<string[]>
		) => void,
		selectValutesOne: (
			item: getValutesAPIType | null
		) => ActionsType,
		selectValutesTwo: (
			item: getValutesAPIType | null
		) => ActionsType
	) => {
		return () => {
			selectValutes(itemOfConditionActive, selectValutesOne)
			selectValutes(itemOfConditionPasive, selectValutesTwo)
			setClasses(() => {
				let index = classesMode.indexOf('open')
				return index > -1
					? classesMode.splice(index - 1, 1)
					: classesMode
			})
		}
    }
    
    const signOfValutes = currentValutes?.map(
		(item) => {
			return (
				<li
					className='list-item'
					onClick={onSelectValutes(
						classes,
						item?.ccy === isSelectValuteOne?.ccy
							? isSelectValuteOne
							: item,
						item?.ccy === isSelectValuteOne?.ccy
							? isSelectValuteTwo
							: isSelectValuteOne,
						setClasses,
						Actions.selectCurrentValutes,
						Actions.selectViseValutes
					)}
					key={item.ccy}
				>
					{item.ccy}
				</li>
			)
		}
	)
    return (
        <>{signOfValutes}</>
    )
}