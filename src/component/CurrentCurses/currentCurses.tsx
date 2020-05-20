import React from 'react'
import { ValuteItem } from './ValuteItem/valuteItem'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../stateManager/redux-store';
import { Button } from '@material-ui/core'
import './../common/button/button.sass'
import './currentCurses.sass'

const CurrentCurses: React.FC = () => {

    /* ===UseSelector=== */
    const currentValutes = useSelector((state: AppStateType) => state.valutesReducer.currentValutes)

    const valuteList = currentValutes!.map(item => {
        return <ValuteItem key={item.ccy} buy={item.buy} sale={item.sale} ccy={item.ccy} />
    })

    return (
        <div className="currentCursesPage">
            <NavLink to="/">
                <Button variant="outlined" color="secondary">
                    Conventor Valutes
                </Button>
            </NavLink>
            <div className="valuteList">
                {valuteList}
            </div>
        </div>
    )
}

export default CurrentCurses