import React from 'react'
import { ValuteItem } from './ValuteItem/valuteItem'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../stateManager/redux-store';
import './../common/button.sass'

export const CurrentCurses: React.FC = () => {

    /* ===UseSelector=== */
    const currentValutes = useSelector((state: AppStateType) => state.valutesReducer.currentValutes)

    let valuteList = currentValutes!.map(item => {
        return <ValuteItem key={item.ccy} buy={item.buy} sale={item.sale} ccy={item.ccy} />
    })

    return (
        <div className="currentCursesPage">
            <NavLink to="/" className="btn">Conventor Valutes</NavLink>
            <div className="valuteList">
                {valuteList}
            </div>
        </div>
    )
}