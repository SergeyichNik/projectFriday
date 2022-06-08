import {CardsApi, CardsQueryParams, CardType} from "../../api/cards-api";
import {AppRootStateType, DispatchActionType, ThunkType} from "../store/store";
import {setAppError, setLoadingStatus} from "./app-reducer";

const initialState = {
    cards: [],
    cardsTotalCount: 0,
    minGrade: 0,
    maxGrade: 0,
    page: 0,
    pageCount: 0,
    packUserId: '',

    sortCards: '',
    cardAnswer: '',
    cardQuestion: '',
    cardsPack_id: '',
    min: 0,
    max: 0,
    cardsPackId: '',
}

export const cardsReducer = (state: InitialStateType = initialState,
                             action: CardsReducerActionType): InitialStateType => {
    switch (action.type) {
        case "CARDS/SET-INFO":
            return {...state, ...action}
        case "CARDS/SET_PAGE":
            return {...state, page: action.page}
        case "CARDS/SET_PAGE_COUNT":
            return {...state, pageCount: action.pageCount}
        case "CARDS/SET-CARDS":
            return {...state, cards: action.cards}
        case "CARDS/SET-PACK-ID":
            return {...state, cardsPackId: action.packId}
        case "CARDS/SET-ANSWER":
            return {...state, cardAnswer: action.cardAnswer}
        case "CARDS/SET-QUESTION":
            return {...state, cardAnswer: action.cardQuestion}
        default:
            return state
    }
}
export type CardsReducerActionType = ReturnType<typeof setCards>
    | ReturnType<typeof setCardsInfo>
    | ReturnType<typeof setPage>
    | ReturnType<typeof setPageCount>
    | ReturnType<typeof searchByAnswer>
    | ReturnType<typeof setPackId>
    | ReturnType<typeof searchByQuestion>

// actions
export const setCards = (cards: CardType[]) => ({type: 'CARDS/SET-CARDS', cards} as const)
export const setCardsInfo = (info: CardsInfoType) => ({type: 'CARDS/SET-INFO', info} as const)
export const setPage = (page: number) => ({type: 'CARDS/SET_PAGE', page} as const)
export const setPageCount = (pageCount: number) => ({type: 'CARDS/SET_PAGE_COUNT', pageCount} as const)
export const setPackId = (packId: string) => ({type: 'CARDS/SET-PACK-ID', packId} as const)
export const searchByAnswer = (cardAnswer: string) => ({type: 'CARDS/SET-ANSWER', cardAnswer} as const)
export const searchByQuestion = (cardQuestion: string) => ({type: 'CARDS/SET-QUESTION', cardQuestion} as const)

// thunk
export const fetchCards = (): ThunkType => async (dispatch: DispatchActionType,
                                                                                  getState: () => AppRootStateType) => {
    const state = getState();
    const cardsPackId = state.cards.cardsPackId;
    try {
        dispatch(setLoadingStatus('loading'))
        const res = await CardsApi.fetchCards({cardsPack_id: cardsPackId})
        dispatch(setCards(res.data.cards))
        const info: CardsInfoType = {
            page: res.data.page,
            pageCount: res.data.pageCount,
            cardsTotalCount: res.data.cardsTotalCount,
            maxGrade: res.data.maxGrade,
            minGrade: res.data.minGrade,
            packUserId: res.data.packUserId,
        }
        dispatch(setCardsInfo(info))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setAppError(error))
    } finally {
        dispatch(setLoadingStatus('idle'))
    }
}

// type
type InitialStateType = CardsInfoType & {
    cards: CardType[]
    sortCards: string
    cardAnswer: string
    cardQuestion: string
    cardsPack_id: string
    min: number
    max: number
    cardsPackId: string
}
type CardsInfoType = {
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}