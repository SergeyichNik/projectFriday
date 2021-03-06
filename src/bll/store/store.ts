import {applyMiddleware, combineReducers, compose} from 'redux';
import {legacy_createStore as createStore} from 'redux';
import {AppActionType, AppReducer} from '../reducers/app-reducer';
import {LoginActionType, loginReducer} from '../reducers/login-reducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {RegistrationActionType, RegistrationReducer} from '../reducers/registration-reducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {RecoveryPasswordActionsType, recoveryPasswordReducer} from '../reducers/recoveryPassword-reducer';
import {newPasswordReducer} from '../reducers/newPasswordReducer';
import {packReducer, PackReducerActionsType} from '../reducers/pack-reducer';
import {cardsReducer, CardsReducerActionType} from "../reducers/cards-reducer";
import {modalReducer, ModalReducerActionsType} from "../reducers";



// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    appReducer: AppReducer,
    newPassword: newPasswordReducer,
    recoverPassword: recoveryPasswordReducer,
    login: loginReducer,
    registration: RegistrationReducer,
    pack: packReducer,
    cards: cardsReducer,
    modal: modalReducer,
})

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export type AppRootStateType = ReturnType<typeof reducer>
export type AppRootActionsType =
    | ModalReducerActionsType
    | RegistrationActionType
    | LoginActionType
    | RecoveryPasswordActionsType
    | AppActionType
    | PackReducerActionsType
    | CardsReducerActionType

export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>

export type DispatchActionType = ThunkDispatch<AppRootStateType, unknown, AppRootActionsType>

export const useAppDispatch = () => useDispatch<DispatchActionType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export default store

//@ts-ignore
window.store = store