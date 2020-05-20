import React, { useEffect, useCallback, Suspense } from 'react';
import './App.sass';
import { useDispatch } from 'react-redux';
import { getValutes } from './stateManager/valutes-reducer';
import { Switch, Route } from 'react-router';
import { Preloader } from './component/common/Preloader/preloader';

const CurrentCurses = React.lazy(() => import("./component/CurrentCurses/currentCurses"))
const ConvertorPage = React.lazy(() => import("./component/ConventorPage/conventerPage"))


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
          <Route path="/" exact render={() => <ConvertorPage />} />
          <Route path="/currentCurses" render={() => <CurrentCurses />} />
        </Switch>
      </div>
    </Suspense >
  );
}

