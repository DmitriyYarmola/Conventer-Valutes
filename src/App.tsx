import React, { useEffect, useCallback, Suspense } from 'react';
import './App.sass';
import { useDispatch } from 'react-redux';
import { getValutes } from './stateManager/valutes-reducer';
import { Switch, Route } from 'react-router';
import { Preloader } from './component/UI/Atoms/Preloader/preloader';

const Curses = React.lazy(() => import("./component/Pages/Curses/index"))
const Converter = React.lazy(() => import("./component/Pages/Conventer/index"))


export const App: React.FC = () => {

  /* ===UseDispatcj=== */
  const dispatch = useDispatch()

  const getCurrentValutes = useCallback(() => {
    dispatch(getValutes())
  }, [dispatch])

  useEffect(() => {
    getCurrentValutes()
  }, [])

  return (
    <Suspense fallback={<Preloader />}>
      <div className="container">
        <Switch>
          <Route path="/" exact render={() => <Converter />} />
          <Route path="/currentCurses" render={() => <Curses />} />
        </Switch>
      </div>
    </Suspense >
  );
}

