import React, { useEffect, useCallback } from 'react';
import './App.sass';
import { CurrentCurses } from './component/CurrentCurses/currentCurses';
import { useSelector, useDispatch } from 'react-redux';
import { AppStateType } from './stateManager/redux-store';
import { getValutes } from './stateManager/valutes-reducer';
import { Switch, Route } from 'react-router';
import { ConvertorPage } from './component/ConventorPage/conventerPage';

export const App = () => {

  /* ===UseSelector=== */
  const currentValutes = useSelector((state: AppStateType) => state.valutesReducer.currentValutes)

  /* ===UseDispatcj=== */
  const dispatch = useDispatch()

  const getCurrentValutes = useCallback(() => {
    dispatch(getValutes())
  }, [dispatch])

  useEffect(() => {
    getCurrentValutes()
  }, [])

  if (!currentValutes) return <div>Loading...</div>
  return (
    <div className="container">
      <Switch>
        <Route path="/" exact render={() => <ConvertorPage />}/>
        <Route path="/currentCurses" render={() => <CurrentCurses />}/>
      </Switch>
    </div>
  );
}

