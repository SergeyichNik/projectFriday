
type InitialStateType = {}
type ActionType = {type: "SomeAction"}

export const AppReducer = (state: InitialStateType = {}, action: ActionType ) => {
    switch (action.type) {
        default:
            return state;
    }
}