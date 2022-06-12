import {AppRootStateType} from "../store/store";


const initialState: ModalStateType = {
    isOpen: false
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
export const toggleIsOpenModal = (isOpen: boolean) => {
    return {
        type: "TOGGLE_IS_OPEN",
        payload: {
            isOpen
        }
    } as const
}

//types
export type ModalStateType = {
    isOpen: boolean
}

export type ModalReducerActionsType =
    | ReturnType<typeof toggleIsOpenModal>
