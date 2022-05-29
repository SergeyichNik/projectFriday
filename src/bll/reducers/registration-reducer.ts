
type InitialStateType = {}
type RegistrationActionsType = ReturnType<typeof registrationAC>;

export const RegistrationReducer = (state: InitialStateType = {}, action: RegistrationActionsType ) => {
    switch (action.type) {
        case "REGISTRATION":
            return state
        default:
            return state;
    }
}

const registrationAC = () => ({type: "REGISTRATION"} as const);