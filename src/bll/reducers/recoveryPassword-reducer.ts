import {api} from '../../api/api';
import {DispatchActionType} from '../store/store';
import {setAppError} from './app-reducer';

const init: InitStateType = {
    info: '',
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
        default:
            return state
    }
}


// --- action ---------

const requestRecoveryPassword = (progressStatus: RequestProgressStatusType) =>
    ({type: 'rp/REQUEST_RECOVERY_PASSWORD', progressStatus} as const)

const setResponseInfoRecoveryPassword = (info: string) =>
    ({type: 'rp/SET_RESPONSE_INFO', info} as const)


// --- thunk ---------

export const sendPasswordRecovery = (email: string) => (dispatch: DispatchActionType) => {
    dispatch(requestRecoveryPassword('loading'))
    api.recoveryPassword(email)
        .then(res => setResponseInfoRecoveryPassword(res.data.info))
        .catch(e => dispatch(setAppError(e.response.data.error)))
        .finally(() => dispatch(requestRecoveryPassword('idle')))
}


// --- type ---------

export type RequestProgressStatusType = 'idle' | 'loading'

export type Nullable<T> = T | null

type InitStateType = {
    info: string,
    progressStatus: RequestProgressStatusType
}

export type RecoveryPasswordActionsType =
    | RequestRecoveryPassword
    | SetResponseInfoRecoveryPassword

type RequestRecoveryPassword = ReturnType<typeof requestRecoveryPassword>
type SetResponseInfoRecoveryPassword = ReturnType<typeof setResponseInfoRecoveryPassword>

// export type ErrorInfoType = {
//     error: string
//     email: string
//     in: string
// }
