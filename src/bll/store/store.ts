import {applyMiddleware, combineReducers} from 'redux';
import {legacy_createStore as createStore} from 'redux';
import {AppActionType, AppReducer} from '../reducers/app-reducer';
import {LoginActionType, loginReducer} from '../reducers/login-reducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {RegistrationActionType, RegistrationReducer} from '../reducers/registration-reducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {RecoveryPasswordActionsType,
    recoveryPasswordReducer
} from '../reducers/recoveryPassword-reducer';
import {newPasswordReducer} from '../reducers/newPasswordReducer';


const reducer = combineReducers({
    appReducer: AppReducer,
    newPassword: newPasswordReducer,
    recoverPassword: recoveryPasswordReducer,
    login: loginReducer,
    registration: RegistrationReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof reducer>
export type AppRootActionsType =
    | RegistrationActionType
    | LoginActionType
    | RecoveryPasswordActionsType
    | AppActionType

export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>
// export const useAppDispatch = () => useDispatch<any>();
export type DispatchActionType = ThunkDispatch<AppRootStateType, unknown, AppRootActionsType>

export const useAppDispatch = () => useDispatch<DispatchActionType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export default store