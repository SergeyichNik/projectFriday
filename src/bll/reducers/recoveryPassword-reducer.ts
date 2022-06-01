import {api} from '../../api/api';
import {DispatchActionType} from '../store/store';

const init: InitStateType = {
    info: '',
    errorInfo: null,
    progressStatus: 'idle'
}

export const recoveryPasswordReducer = (state: InitStateType = init, action: RecoveryPasswordActionsType): InitStateType => {
    switch (action.type) {
        case 'rp/REQUEST_RECOVERY_PASSWORD': {
            return {
                ...state,
                progressStatus: action.progressStatus
            }
        }
        case 'rp/SET_RESPONSE_INFO': {
            return {
                ...state,
                info: action.info
            }
        }
        case 'rp/SET_ERROR_RESPONSE_RECOVERY_PASSWORD': {
            return {
                ...state,
                errorInfo: action.e
            }
        }
        default:
            return state
    }
}


// --- action ---------

const requestRecoveryPassword = (progressStatus: RequestProgressStatusType) =>
    ({type: 'rp/REQUEST_RECOVERY_PASSWORD', progressStatus} as const)

const setResponseInfoRecoveryPassword = (info: string) =>
    ({type: 'rp/SET_RESPONSE_INFO', info} as const)

const setErrorResponseRecoveryPassword = (e: ErrorInfoType) =>
    ({type: 'rp/SET_ERROR_RESPONSE_RECOVERY_PASSWORD', e} as const)


// --- thunk ---------

export const sendPasswordRecovery = (email: string) => (dispatch: DispatchActionType) => {
    dispatch(requestRecoveryPassword('loading'))
    api.recoveryPassword(email)
        .then(res => setResponseInfoRecoveryPassword(res.data.info))
        .catch(e => dispatch(setErrorResponseRecoveryPassword(e.response.data)))
        .finally(() => dispatch(requestRecoveryPassword('idle')))
}


// --- type ---------

export type RequestProgressStatusType = 'idle' | 'loading'

export type Nullable<T> = T | null

export type ErrorInfoType = {
    error: string
    email: string
    in: string
}

type InitStateType = {
    info: string,
    errorInfo: Nullable<ErrorInfoType>
    progressStatus: RequestProgressStatusType
}

export type RecoveryPasswordActionsType =
    | RequestRecoveryPassword
    | SetResponseInfoRecoveryPassword
    | SetErrorResponseRecoveryPassword

type RequestRecoveryPassword = ReturnType<typeof requestRecoveryPassword>
type SetResponseInfoRecoveryPassword = ReturnType<typeof setResponseInfoRecoveryPassword>
type SetErrorResponseRecoveryPassword = ReturnType<typeof setErrorResponseRecoveryPassword>