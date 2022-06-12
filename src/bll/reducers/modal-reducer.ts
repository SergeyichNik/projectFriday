import {AppRootStateType} from "../store/store";




const initialState: ModalStateType = {
    isOpen: false,
    component: null
}

export const modalReducer =
    (
        state: ModalStateType = initialState,
        action: ModalReducerActionsType,
    ): ModalStateType => {

    switch (action.type) {
        case "TOGGLE_IS_OPEN":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

//selector
export const selectModal = (state: AppRootStateType) => state.modal

//actionCreators
export const controlModalWindowAC = (isOpen: boolean, component: ModalComponentType) => {
    return {
        type: "TOGGLE_IS_OPEN",
        payload: {
            isOpen,
            component
        }
    } as const
}

//types

export type ModalComponentType = "DELETE" | "ADD" | "EDIT" | null

export type ModalStateType = {
    isOpen: boolean,
    component: ModalComponentType
}

export type ModalReducerActionsType =
    | ReturnType<typeof controlModalWindowAC>
