import {applyMiddleware, combineReducers} from "redux";
import {legacy_createStore as createStore} from "redux";
import {AppReducer} from "../reducers/app-reducer";
import thunk from "redux-thunk";
import {newPasswordReducer} from "../reducers/newPasswordReducer";
import {loginReducer} from "../reducers/login-reducer";


const reducer = combineReducers({
    appReducer: AppReducer,
    newPassword: newPasswordReducer,
    login: loginReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof reducer>

export default store