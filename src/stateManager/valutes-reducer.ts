import { getValutesAPIType } from './../api/api';
import { AppStateType } from './redux-store';
import { ValutesAPI } from "../api/api"
import { ThunkAction } from 'redux-thunk';

const GET_CURRENT_VALUES = "GET_CURRENT_VALUE"

let initialState = {
    currentValutes: null as getValutesAPIType[] | null
}

type InitialStateType = typeof initialState
type ActionsType = GetCurrentValutesType

export const ValutesReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case GET_CURRENT_VALUES:
            return {
                ...state,
                currentValutes: action.currentValues
            }
        default: return state
    }
}

/* ===ActionsCreate=== */

export type currentValuesType = {
    CharCode?: string
    ID?: string
    Name?: string
    Nominal?: number
    NumCode?: string
    Previous?: number
    Value?: number
}

type GetCurrentValutesType = {
    type: typeof GET_CURRENT_VALUES,
    currentValues: getValutesAPIType[]
}

const getCurrentValutes = (currentValues: getValutesAPIType[]): GetCurrentValutesType => ({
    type: GET_CURRENT_VALUES,
    currentValues
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