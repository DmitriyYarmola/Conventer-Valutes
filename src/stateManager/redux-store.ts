import { ValutesReducer } from './valutes-reducer';
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from "redux-thunk";

let rootReducer = combineReducers({
    valutesReducer: ValutesReducer
})


type RootReducerType = typeof rootReducer

export type AppStateType = ReturnType<RootReducerType>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))