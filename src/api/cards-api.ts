import {instance} from "./auth-api";

export const CardsApi = {
    fetchCards({cardsPack_id}: CardsQueryParams) {
        return instance.get<CardsResponseType>('/cards/card', {params: {cardsPack_id}})
    },
    getCards({cardAnswer, cardQuestion, cardsPack_id, sortCards, min, max, page, pageCount}: CardsQueryParams) {
        return instance.get<CardsResponseType>('/cards/card',
            {params: {cardAnswer, cardQuestion, cardsPack_id, sortCards, min, max, page, pageCount}})
    },
}

// type
export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}
export type CardsResponseType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
export type CardsQueryParams = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}
