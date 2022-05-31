import {api, RegistrationParamsType} from "../../api/api";
import {ThunkType} from "../store/store";

export const InitialRegistrationState = {
    isRegistered: false,
    error: null as string | null
}

//Types
export type InitialRegistrationStateType = typeof InitialRegistrationState;
export type RegistrationActionType = ReturnType<typeof setRegistrationAC> | ReturnType<typeof setErrorRegistrationAC>;

//Reducer
export const RegistrationReducer = (state: InitialRegistrationStateType = InitialRegistrationState, action: RegistrationActionType):InitialRegistrationStateType => {
    switch (action.type) {
        case "REGISTRATION":
            return {...state, isRegistered: action.isRegistered};
        case "SET-ERROR-REGISTRATION":
            return {...state, error: action.error}
        default:
            return state;
    }
}

//ActionCreators
export const setRegistrationAC = (isRegistered: boolean) => ({type: "REGISTRATION", isRegistered} as const);
export const setErrorRegistrationAC = (error: string | null) => ({type: "SET-ERROR-REGISTRATION", error} as const);

//ThunkCreator
export const setRegistrationTC = (data: RegistrationParamsType): ThunkType => (dispatch) => {
    api.registration(data)
        .then((res) => {
            console.log(res.data);
            dispatch(setRegistrationAC(true));
        })
        .catch((error) => {
            dispatch(setErrorRegistrationAC(error.response.data.error));
        })
}
