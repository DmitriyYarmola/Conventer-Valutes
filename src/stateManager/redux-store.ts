import { ValutesReducer, getValutesWatcher } from './valutes-reducer';
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from "redux-thunk";
import createSagaMiddleware from 'redux-saga'

let rootReducer = combineReducers({
    valutesReducer: ValutesReducer
})

const sagaMiddleware = createSagaMiddleware()

type RootReducerType = typeof rootReducer

export type AppStateType = ReturnType<RootReducerType>

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(getValutesWatcher)