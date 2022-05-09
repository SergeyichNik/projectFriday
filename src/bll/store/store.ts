import {combineReducers} from "redux";
import {legacy_createStore as createStore} from "redux";
import {AppReducer} from "../reducers/app-reducer";


const reducer = combineReducers({
    appReducer: AppReducer
})

const store = createStore(reducer)

export type AppRootStateType = ReturnType<typeof reducer>

export default store