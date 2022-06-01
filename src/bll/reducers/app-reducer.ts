type LoadingStatusType = 'idle' | 'loading'
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
        case "app/SET-APP-ERROR":
            return {...state, error: action.error}
        case "app/SET-LOADING-STATUS":
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