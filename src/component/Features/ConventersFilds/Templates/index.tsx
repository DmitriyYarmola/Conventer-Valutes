import React, { useState, useEffect } from 'react'
import { Input } from '../../../UI/Atoms/Input'
import { useSelector, useDispatch } from 'react-redux'
import { AppStateType } from '../../../../stateManager/redux-store'
import { getValutesAPIType } from '../../../../api/api'
import {
	ActionsType,
	Actions,
} from '../../../../stateManager/valutes-reducer'
import { Preloader } from '../../../UI/Atoms/Preloader/preloader'
import './style.sass'
import { RowConvertValute } from '../Organisms/index'

export const ConventersFields = () => {
	/* ===UseState=== */

	let [classesActive, setClassesActive] = useState<
		string[]
	>(['valute-list_wrapper'])
	let [classesPasive, setClassesPasive] = useState<
		string[]
	>(['valute-list_wrapper'])
	let [
		inputValueResultActive,
		setInputValueResultActive,
	] = useState<string>('1')
	let [
		inputValueResultPasive,
		setInputValueResultPasive,
	] = useState<string>('1')

	const inputValueChange = (
		inputText: string,
		inputNumber: string
	) => {
		setInputValueResultActive(inputText)
		setInputValueResultPasive(inputNumber)
	}

	/* ===UseSelector=== */
	const currentValutes = useSelector(
		(state: AppStateType) =>
			state.valutesReducer.currentValutes
	)
	let isSelectValuteActive = useSelector(
		(state: AppStateType) =>
			state.valutesReducer.isSelectValuteActive
	)
	let isSelectValutePasive = useSelector(
		(state: AppStateType) =>
			state.valutesReducer.isSelectValutePasive
	)
	/* ===UseDispatch=== */
	const dispatch = useDispatch()

	if (currentValutes) {
		if (!isSelectValuteActive)
			isSelectValuteActive = currentValutes[0]
		if (!isSelectValutePasive)
			isSelectValutePasive = currentValutes[1]
	}

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

	const signOfValutesPasive = currentValutes?.map(
		(item) => {
			return (
				<li
					className='list-item'
					onClick={onSelectValutes(
						classesPasive,
						item?.ccy === isSelectValuteActive?.ccy
							? isSelectValutePasive
							: isSelectValuteActive,
						item?.ccy === isSelectValuteActive?.ccy
							? isSelectValuteActive
							: item,
						setClassesPasive,
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

	const signOfValutesActive = currentValutes?.map(
		(item) => {
			return (
				<li
					className='list-item'
					onClick={onSelectValutes(
						classesActive,
						item?.ccy === isSelectValutePasive?.ccy
							? isSelectValutePasive
							: item,
						item?.ccy === isSelectValutePasive?.ccy
							? isSelectValuteActive
							: isSelectValutePasive,
						setClassesActive,
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

	const OnActiveInputChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		isSelectValuteActive?.ccy === 'BTC'
			? inputValueChange(
					e.currentTarget.value,
					String(
						(
							Number(e.currentTarget.value) *
							((Number(isSelectValuteActive?.sale) *
								Number(currentValutes![0].sale)) /
								Number(isSelectValutePasive?.sale))
						).toFixed(2)
					)
			  )
			: inputValueChange(
					e.currentTarget.value,
					String(
						(
							(Number(isSelectValuteActive?.sale) /
								Number(isSelectValutePasive?.sale)) *
							Number(e.currentTarget.value)
						).toFixed(2)
					)
			  )
	}

	const OnPasiveInputChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		isSelectValutePasive?.ccy === 'BTC'
			? inputValueChange(
					String(
						(
							(Number(e.currentTarget.value) *
								(Number(isSelectValutePasive?.sale) *
									Number(currentValutes![0].sale))) /
							Number(isSelectValuteActive?.sale)
						).toFixed(2)
					),
					e.currentTarget.value
			  )
			: inputValueChange(
					String(
						(
							(Number(isSelectValutePasive?.sale) /
								Number(isSelectValuteActive?.sale)) *
							Number(e.currentTarget.value)
						).toFixed(2)
					),
					e.currentTarget.value
			  )	
	}

	useEffect(() => {
		setInputValueResultPasive(
			isSelectValuteActive?.ccy === 'BTC'
				? String(
						(
							(Number(inputValueResultActive) *
								(Number(isSelectValuteActive?.sale) *
									Number(currentValutes![0].sale))) /
							Number(isSelectValutePasive?.sale)
						).toFixed(2)
				  )
				: String(
						(
							(Number(isSelectValuteActive?.sale) /
								Number(isSelectValutePasive?.sale)) *
							Number(inputValueResultActive)
						).toFixed(2)
				  )
		)
	}, [currentValutes,
		isSelectValuteActive,
		isSelectValutePasive,
	])

	if(!currentValutes) return <Preloader />
	return (
		<div className='conventer-form_wrapper'>
			<RowConvertValute classesForDiv={classesActive} classMenuOne={classesPasive} classMenuTwo={classesActive} setClassForMenu={setClassesActive} value={inputValueResultActive} onChange={OnActiveInputChange} valuteCCY={isSelectValuteActive?.ccy} valutes={signOfValutesActive}/>
			<RowConvertValute classesForDiv={classesPasive} classMenuOne={classesActive} classMenuTwo={classesPasive} setClassForMenu={setClassesPasive} value={inputValueResultPasive} onChange={OnPasiveInputChange} valuteCCY={isSelectValutePasive?.ccy} valutes={signOfValutesPasive}/>
		</div>
	)
}
