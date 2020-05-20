import { ValutesReducer } from './valutes-reducer';
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from "redux-thunk";

let rootReducer = combineReducers({
    valutesReducer: ValutesReducer
})


type RootReducerType = typeof rootReducer

export type AppStateType = ReturnType<RootReducerType>

type PropertiesType<T> = T extends  { [key: string]: infer U } ? U : never

export type InferActionsType<T extends { [key: string]: (...args: any[]) => any}> = ReturnType<PropertiesType<T>>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))