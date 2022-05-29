import {authAPI, RegistrationParamsType} from "../../api/api";
import {ThunkType} from "../store/store";

const InitialState = {
    isRegistered: false
}

//Types
type InitialStateType = typeof InitialState;
export type RegistrationActionType = ReturnType<typeof setRegistrationAC>;

//Reducer
export const RegistrationReducer = (state: InitialStateType, action: RegistrationActionType) => {
    switch (action.type) {
        case "REGISTRATION":
            return {...state, isRegistered: action.isRegistered};
        default:
            return state;
    }
}
//ActionCreator
export const setRegistrationAC = (isRegistered: boolean) => ({type: "REGISTRATION", isRegistered} as const);

//ThunkCreator
export const registrationTC = (data: RegistrationParamsType): ThunkType => (dispatch) => {
    authAPI.registration(data)
        .then((res) => {
            console.log(res.data);
            dispatch(setRegistrationAC(true));
        })
        .catch((error) => {
            console.log(error);
        })
}
