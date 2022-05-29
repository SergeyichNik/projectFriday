import {combineReducers} from "redux";
import {legacy_createStore as createStore} from "redux";
import {AppReducer} from "../reducers/app-reducer";
import {RegistrationReducer} from "../reducers/registration-reducer";


const reducer = combineReducers({
    appReducer: AppReducer,
    registration: RegistrationReducer
})

const store = createStore(reducer)

export type AppRootStateType = ReturnType<typeof reducer>

export default store