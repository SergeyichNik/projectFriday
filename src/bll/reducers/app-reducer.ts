import {ThunkType} from '../store/store';
import {api} from '../../api/api';
import {getUserData, LoginResponseType} from './login-reducer';

export type LoadingStatusType = 'idle' | 'loading'
type InitialStateType = {
    error: string | null
    loadingStatus: LoadingStatusType
}
export type AppActionType = ReturnType<typeof setAppError> | ReturnType<typeof setLoadingStatus>

const initialState: InitialStateType = {
    error: null,
    loadingStatus: 'idle'
}
export const AppReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case 'app/SET-APP-ERROR':
            return {...state, error: action.error}
        case 'app/SET-LOADING-STATUS':
            return {...state, loadingStatus: action.loadingStatus}
        default:
            return state;
    }
}
export const setAppError = (error: string | null) => ({type: 'app/SET-APP-ERROR', error} as const)
export const setLoadingStatus = (loadingStatus: LoadingStatusType) => {
    return {
        type: 'app/SET-LOADING-STATUS',
        loadingStatus
    } as const
}

export const authMe = (): ThunkType => async dispatch => {
    try {
        dispatch(setLoadingStatus('loading'))
        const res = await api.authMe()
        dispatch(getUserData(res.data, true))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        console.log(error)
    } finally {
        dispatch(setLoadingStatus('idle'))
    }
}

export const logOut = (): ThunkType => async dispatch => {
    try {
        dispatch(setLoadingStatus('loading'))
        const res = await api.logOut()
        dispatch(getUserData({} as LoginResponseType, false))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setAppError(error))
    } finally {
        dispatch(setLoadingStatus('idle'))
    }
}