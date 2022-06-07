import {AppRootStateType, DispatchActionType, ThunkType} from '../store/store';
import {CardsPackAPI, Pack, PackCard, PackQueryParams} from '../../api/packAPI';
import {setAppError, setLoadingStatus} from './app-reducer';

const initialState: Pack = {
    cardPacks: [],
    page: 0,
    pageCount: 5,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    token: '',
    tokenDeathTime: 0
}

export const packReducer = (state: Pack = initialState, action: PackReducerActionsType): Pack => {
    switch (action.type) {
        case 'PACK/SET_CARD_PACKS':
            return {...state, cardPacks: action.cardPacks}
        case 'PACK/SET_CARD_PACKS_INFO':
            return {...state, ...action.cardPacksInfo}
        case "PACK/SET_PAGE":
            return {...state, page: action.page}
        case "PACK/SET_PAGE_COUNT":
            return {...state, pageCount: action.pageCount}
        default: return state
    }
}


// --- action
const setCardPacks = (cardPacks: PackCard[]) => ({type: 'PACK/SET_CARD_PACKS', cardPacks} as const)
const setCardPacksInfo = (cardPacksInfo: PackCardsInfo) => ({type: 'PACK/SET_CARD_PACKS_INFO', cardPacksInfo} as const)
export const setPage = (page: number) => ({type: 'PACK/SET_PAGE', page} as const)
export const setPageCount = (pageCount: number) => ({type:'PACK/SET_PAGE_COUNT', pageCount} as const)

// --- thunk
export const fetchCardsPack = (): ThunkType => async (dispatch: DispatchActionType, getState: () => AppRootStateType) => {
    const state = getState()
    const params: PackQueryParams = {page: state.pack.page, pageCount: state.pack.pageCount}
    try {
        dispatch(setLoadingStatus('loading'))
        const res = await CardsPackAPI.getPack(params)
        dispatch(setCardPacks(res.data.cardPacks))
        const info:PackCardsInfo = {
            page: res.data.page,
            pageCount: res.data.pageCount,
            cardPacksTotalCount: res.data.cardPacksTotalCount,
            minCardsCount: res.data.minCardsCount,
            maxCardsCount: res.data.minCardsCount,
            token: res.data.token,
            tokenDeathTime: res.data.tokenDeathTime
        }
        dispatch(setCardPacksInfo(info))

    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setAppError(error))
    } finally {
        dispatch(setLoadingStatus('idle'))
    }
}


// --- type
export type PackReducerActionsType =
    | ReturnType<typeof setCardPacks>
    | ReturnType<typeof setCardPacksInfo>
    | ReturnType<typeof setPage>
    | ReturnType<typeof setPageCount>

type PackCardsInfo = {
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number // 103
    token: string
    tokenDeathTime: number
}