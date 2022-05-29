import {applyMiddleware, combineReducers} from "redux";
import {legacy_createStore as createStore} from "redux";
import {AppReducer} from "../reducers/app-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {RegistrationActionType, RegistrationReducer} from "../reducers/registration-reducer";


const reducer = combineReducers({
    appReducer: AppReducer,
    registration: RegistrationReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof reducer>
export type AppRootActionsType = RegistrationActionType

export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>

export default store