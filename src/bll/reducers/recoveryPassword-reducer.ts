import {authApi} from '../../api/auth-api';
import {DispatchActionType, ThunkType} from '../store/store';
import {setAppError, setLoadingStatus} from './app-reducer';
import {useParams} from "react-router-dom";

const init: InitStateType = {
    info: '',
}

export const recoveryPasswordReducer = (state: InitStateType = init, action: RecoveryPasswordActionsType): InitStateType => {
    switch (action.type) {
        case 'rp/SET_RESPONSE_INFO':
            return {...state, info: action.info}
        default:
            return state
    }
}

// --- action ---------

const setResponseInfoRecoveryPassword = (info: string) =>
    ({type: 'rp/SET_RESPONSE_INFO', info} as const)


// --- thunk ---------

export const sendPasswordRecovery = (email: string):ThunkType => async (dispatch: DispatchActionType) => {
    try {
        dispatch(setLoadingStatus('loading'))
        const res = await authApi.recoveryPassword(email)
        dispatch(setResponseInfoRecoveryPassword(res.data.info))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setAppError(error))
    } finally {
        dispatch(setLoadingStatus('idle'))
    }
}

export const setNewPasswordTC = (password: string, token: string) => async (dispatch: DispatchActionType) => {
    try {
        dispatch(setLoadingStatus('loading'))
        const res = await authApi.setNewPass(password, token)
        dispatch(setResponseInfoRecoveryPassword(res.data.info))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setAppError(error))
    } finally {
        dispatch(setLoadingStatus('idle'))
    }
}


// --- type ---------

export type Nullable<T> = T | null

type InitStateType = {
    info: string,
}

export type RecoveryPasswordActionsType =
    | SetResponseInfoRecoveryPassword

type SetResponseInfoRecoveryPassword = ReturnType<typeof setResponseInfoRecoveryPassword>

// export type ErrorInfoType = {
//     error: string
//     email: string
//     in: string
// }
