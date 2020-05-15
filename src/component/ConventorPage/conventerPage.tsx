import React from 'react'
import { NavLink } from 'react-router-dom'
import './conventerPage.sass'
export const ConvertorPage = () => {
    return (

        <div className="conventerValutesPage">
            <NavLink to="/currentCurses" className="btn">Current Curses</NavLink>
        </div>
    )
}