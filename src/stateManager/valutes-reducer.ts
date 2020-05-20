import { getValutesAPIType } from './../api/api';
import { AppStateType, InferActionsType } from './redux-store';
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
export type ActionsType = InferActionsType<typeof Actions>

export const ValutesReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case GET_CURRENT_VALUES:
            return {
                ...state,
                currentValutes: action.currentValutes
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

export const Actions = {
    getCurrentValutes: (currentValutes: getValutesAPIType[]) => ({
        type: GET_CURRENT_VALUES,
        currentValutes
    } as const),

    selectCurrentValutes: (item: getValutesAPIType | null) => ({
        type: SELECT_CURRENT_VALUTES,
        item
    } as const),

    selectViseValutes: (item: getValutesAPIType | null) => ({
        type: SELECT_VISE_VALUTES,
        item
    } as const),
    inputValute: (inputText: string) => ({
        type: INPUT_VALUTE,
        inputText
    } as const)
}

/* ===Thunks=== */

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getValutes = (): ThunkType => {
    return async (dispatch: any) => {
        let data = await ValutesAPI.getValutes()
        dispatch(Actions.getCurrentValutes(data))
    }
}


//@ts-ignore
window._state_ = getValutes