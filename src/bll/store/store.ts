import {applyMiddleware, combineReducers} from "redux";
import {legacy_createStore as createStore} from "redux";
import {AppReducer} from "../reducers/app-reducer";
import thunk from "redux-thunk";


const reducer = combineReducers({
    appReducer: AppReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof reducer>

export default store