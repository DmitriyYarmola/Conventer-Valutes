import React from 'react'
import { NavLink } from 'react-router-dom'
import { AppStateType } from '../../../stateManager/redux-store'
import { useSelector } from 'react-redux'
import { LookValutes } from '../../Features/LookValutes'
import  {ConventersFields} from '../../Features/ConventersFilds/Templates/index'
import { Button } from '../../UI/Atoms/Button'
import './../../Features/ConventersFilds/Templates/style.sass'
import '././../../UI/Atoms/Button/style.sass'
import { Preloader } from '../../UI/Atoms/Preloader/preloader'

export default() => {
	const currentValutes = useSelector(
		(state: AppStateType) =>
			state.valutesReducer.currentValutes
	)

	if (!currentValutes) return <Preloader />

	return (
		<div className='conventerValutesPage'>
			<NavLink to='/currentCurses'>
				<Button
					variant={'outlined'}
					color={'secondary'}
					content={'Current Valutes'}
				/>
			</NavLink>
			<div className='conventer-form'>
				<div className='currentValue-valute'>
					<LookValutes />
				</div>
				<ConventersFields />
			</div>
		</div>
	)
}

