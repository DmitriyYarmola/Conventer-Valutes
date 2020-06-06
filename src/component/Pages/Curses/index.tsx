import React from 'react'
import { ValuteItem } from '../../Features/ValuteItem/index'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../../stateManager/redux-store'
import { Button } from '../../UI/Atoms/Button/index'
import './../../UI/Atoms/Button/style.sass'
import './index'

export default () => {
	/* ===UseSelector=== */
	const currentValutes = useSelector(
		(state: AppStateType) =>
			state.valutesReducer.currentValutes
	)
	console.log(currentValutes)
	const valuteList = currentValutes!.map((item) => {
		return (
			<ValuteItem
				key={item.ccy}
				buy={item.buy}
				sale={item.sale}
				ccy={item.ccy}
			/>
		)
	})

	return (
		<div className='currentCursesPage'>
			<NavLink to='/'>
				<Button variant={'outlined'} color={'secondary'} content={'Conventor Valutes'}/>
			</NavLink>
			<div className='valuteList'>{valuteList}</div>
		</div>
	)
}
