import {instance} from './api';


export const CardsPackApi = {
    getPack({packName, min, max, sortPacks, page, pageCount, user_id}: PackQueryParams) {
        return instance.get<Pack>('/cards/pack', {params: {packName, min, max, sortPacks, page, pageCount, user_id}})
    }
}


// --- type

type PackCard = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    deckCover: string
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
}

export type PackCards = PackCard[]

export type Pack = {
    cardPacks: PackCards
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number // 103
    token: string
    tokenDeathTime: number
}

type PackQueryParams = {
    packName?: string
    min?: string
    max?: string
    sortPacks?: string
    page?: string
    pageCount?: string
    user_id?: string
}