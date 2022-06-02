import {api} from '../../api/api';
import {DispatchActionType} from '../store/store';
import {setAppError, setLoadingStatus} from './app-reducer';

const init: InitStateType = {
    info: '',
}

export const recoveryPasswordReducer = (state: InitStateType = init, action: RecoveryPasswordActionsType): InitStateType => {
    switch (action.type) {
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

const setResponseInfoRecoveryPassword = (info: string) =>
    ({type: 'rp/SET_RESPONSE_INFO', info} as const)


// --- thunk ---------

export const sendPasswordRecovery = (email: string) => (dispatch: DispatchActionType) => {
    dispatch(setLoadingStatus('loading'))
    api.recoveryPassword(email)
        .then(res => setResponseInfoRecoveryPassword(res.data.info))
        .catch(e => dispatch(setAppError(e.response.data.error)))
        .finally(() => dispatch(setLoadingStatus('idle')))
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
