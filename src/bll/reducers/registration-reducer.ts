import {api, RegistrationParamsType} from "../../api/api";
import {ThunkType} from "../store/store";

export const InitialRegistrationState = {
    isRegistered: false
}

//Types
export type InitialRegistrationStateType = typeof InitialRegistrationState;
export type RegistrationActionType = ReturnType<typeof setRegistrationAC>;

//Reducer
export const RegistrationReducer = (state: InitialRegistrationStateType = InitialRegistrationState, action: RegistrationActionType):InitialRegistrationStateType => {
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
export const setRegistrationTC = (data: RegistrationParamsType): ThunkType => (dispatch) => {
    api.registration(data)
        .then((res) => {
            console.log(res.data);
            dispatch(setRegistrationAC(true));
        })
        .catch((error) => {
            console.log(error.response.data.error);
        })
}
