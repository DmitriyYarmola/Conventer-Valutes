import { getValutesAPIType } from './../api/api';
import { AppStateType } from './redux-store';
import { ValutesAPI } from "../api/api"
import { ThunkAction } from 'redux-thunk';

const GET_CURRENT_VALUES = "GET_CURRENT_VALUE"
const SELECT_CURRENT_VALUTES = "SELECT_CURRENT_VALUTES"
const SELECT_VISE_VALUTES = "SELECT_VISE_VALUTES"
const INPUT_VALUTE = "INPUT_VALUTE"
let initialState = {
    currentValutes: null as getValutesAPIType[] | null,
    isSelectValuteActive: null as getValutesAPIType | null,
    isSelectValutePasive: null as getValutesAPIType | null,
    inputValue: '',
    // resultValute:  
}

type InitialStateType = typeof initialState
type ActionsType = GetCurrentValutesType | SelectCurrentValutesType | SelectViseValutesType | InputValuteType

export const ValutesReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case GET_CURRENT_VALUES:
            return {
                ...state,
                currentValutes: action.currentValues
            }
        case SELECT_CURRENT_VALUTES:
            return {
                ...state,
                isSelectValuteActive: action.item
            }
        case SELECT_VISE_VALUTES:
            return {
                ...state,
                isSelectValutePasive: action.item
            }
        case INPUT_VALUTE: 
            return {
                ...state,
                inputValue: action.inputText
            }
        default: return state
    }
}

/* ===ActionsCreate=== */


type GetCurrentValutesType = {
    type: typeof GET_CURRENT_VALUES,
    currentValues: getValutesAPIType[]
}

const getCurrentValutes = (currentValues: getValutesAPIType[]): GetCurrentValutesType => ({
    type: GET_CURRENT_VALUES,
    currentValues
})

type SelectCurrentValutesType = {
    type: typeof SELECT_CURRENT_VALUTES,
    item: getValutesAPIType | null
}

export const selectCurrentValutes = (item: getValutesAPIType | null): SelectCurrentValutesType => ({
    type: SELECT_CURRENT_VALUTES,
    item
})

type SelectViseValutesType = {
    type: typeof SELECT_VISE_VALUTES,
    item: getValutesAPIType | null
}

export const selectViseValutes = (item: getValutesAPIType | null): SelectViseValutesType => ({
    type: SELECT_VISE_VALUTES,
    item
})

type InputValuteType = {
    type: typeof INPUT_VALUTE,
    inputText: string
}

export const inputValute = (inputText: string): InputValuteType => ({
    type: INPUT_VALUTE,
    inputText
})

/* ===Thunks=== */

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getValutes = (): ThunkType => {
    return async (dispatch: any) => {
        let data = await ValutesAPI.getValutes()
        console.log(data)
        dispatch(getCurrentValutes(data))
    }
}


//@ts-ignore
window._state_ = getValutes