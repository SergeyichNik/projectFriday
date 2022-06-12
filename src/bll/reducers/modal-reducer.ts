import {AppRootStateType} from "../store/store";


export const clearedModalModel: ModalModelType = {
    isOpen: false,
    currentPackName: null,
    component: null,
    currentPackID: null,
}

const initialState: ModalStateType = {
    isOpen: false,
    component: null,
    currentPackID: null,
    currentPackName: null
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
export const controlModalWindowAC =
    (model: ModalModelType) => {
    return {
        type: "TOGGLE_IS_OPEN",
        payload: {
            ...model
        }
    } as const
}

//types

export type ModalComponentType = "DELETE" | "ADD" | "EDIT" | null

export type ModalStateType = {
    isOpen: boolean,
    component: ModalComponentType,
    currentPackID: string | null,
    currentPackName: string | null,
}

export type ModalReducerActionsType =
    | ReturnType<typeof controlModalWindowAC>

export type ModalModelType = {
    isOpen: boolean,
    component: ModalComponentType
    currentPackID: string | null
    currentPackName: string | null
}