import React from 'react'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../../stateManager/redux-store'

export const LookValutes = () => {
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
	if (currentValutes) {
		if (!isSelectValuteActive)
			isSelectValuteActive = currentValutes[0]
		if (!isSelectValutePasive)
			isSelectValutePasive = currentValutes[1]
	}

	return (
		<span>
			1 {isSelectValuteActive?.ccy} ={' '}
			{isSelectValuteActive?.ccy === 'BTC'
				? (
						(Number(isSelectValuteActive?.sale) *
							Number(currentValutes![0].sale)) /
						Number(isSelectValutePasive?.sale)
				  ).toFixed(2)
				: (
						Number(isSelectValuteActive?.sale) /
						Number(isSelectValutePasive?.sale)
				  ).toFixed(2)}{' '}
			{isSelectValutePasive?.ccy}
		</span>
	)
}
