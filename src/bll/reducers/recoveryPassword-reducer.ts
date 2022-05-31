import {api} from '../../api/api';
import {AppRootStateType} from '../store/store';
import {ThunkAction, ThunkDispatch } from 'redux-thunk';

export type RequestProgressStatusType = 'idle' | 'loading'

type InitStateType = {
    info: string
    progressStatus: RequestProgressStatusType
}

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
        default: return state
    }
}


// --- action ---------

type RecoveryPasswordActionsType =
    | RequestRecoveryPassword
    | SetResponseInfoRecoveryPassword

type RequestRecoveryPassword = ReturnType<typeof requestRecoveryPassword>
const requestRecoveryPassword = (progressStatus: RequestProgressStatusType) =>
    ({type: 'rp/REQUEST_RECOVERY_PASSWORD', progressStatus} as const)

type SetResponseInfoRecoveryPassword = ReturnType<typeof setResponseInfoRecoveryPassword>
const setResponseInfoRecoveryPassword = (info: string) =>
    ({type: 'rp/SET_RESPONSE_INFO', info} as const)


// --- thunk ---------

export const sendPasswordRecovery = (email: string) => (dispatch: AppDispatchActionType) => {
    dispatch(requestRecoveryPassword('loading'))
    api.recoveryPassword(email)
        .then(res => setResponseInfoRecoveryPassword(res.data.info))
        .catch(e => e)
        .finally(() => dispatch(requestRecoveryPassword('idle')))
}

export type AppThunksType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, RecoveryPasswordActionsType>
export type AppDispatchActionType = ThunkDispatch<AppRootStateType, unknown, RecoveryPasswordActionsType>

