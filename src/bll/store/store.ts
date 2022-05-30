import {applyMiddleware, combineReducers} from "redux";
import {legacy_createStore as createStore} from "redux";
import {AppReducer} from "../reducers/app-reducer";
import thunk from "redux-thunk";
import {recoveryPasswordReducer} from '../reducers/recoveryPassword-reducer';
import {newPasswordReducer} from "../reducers/newPasswordReducer";


const reducer = combineReducers({
    appReducer: AppReducer,
    newPassword: newPasswordReducer,
    recoverPassword: recoveryPasswordReducer,
})

const store = createStore(reducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof reducer>

export default store

