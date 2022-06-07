import {AppRootStateType, DispatchActionType, ThunkType} from '../store/store';
import {CardsPackAPI, Pack, PackCard, PackQueryParams} from '../../api/packAPI';
import {setAppError, setLoadingStatus} from './app-reducer';

const initialState: PackInitStateType = {
    cardPacks: [],
    page: 1,
    pageCount: 10,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    token: '',
    tokenDeathTime: 0,

    packName: '',
    sortBy: '',
    order: 'desc',
    packOwner: 'all',
    minSort: 0,
    maxSort: 1
}

export const packReducer = (state: PackInitStateType = initialState, action: PackReducerActionsType): PackInitStateType => {
    // debugger
    switch (action.type) {
        case 'PACK/SET_CARD_PACKS':
            return {...state, cardPacks: action.cardPacks}
        case 'PACK/SET_CARD_PACKS_INFO':
            return {...state, ...action.cardPacksInfo}
        case 'PACK/SET_SORT_BY':{
            const isAsc = state.sortBy === action.sortBy && state.order === 'asc';
            return {
                ...state,
                order: isAsc ? 'desc' : 'asc',
                sortBy: action.sortBy
            }
        }
        case 'PACK/SET_PACK_OWNER':
            return {...state, packOwner: action.owner}
        case 'PACK/SET_MIN_MAX_SORT':
            return {...state, minSort: action.range[0], maxSort: action.range[1]}
        default:
            return state
    }
}


// --- action
const setCardPacks = (cardPacks: PackCard[]) => ({type: 'PACK/SET_CARD_PACKS', cardPacks} as const)
const setCardPacksInfo = (cardPacksInfo: PackCardsInfo) => ({type: 'PACK/SET_CARD_PACKS_INFO', cardPacksInfo} as const)
export const setSortBy = (sortBy: string) => ({type: 'PACK/SET_SORT_BY', sortBy} as const)
export const setPackOwner = (owner: 'all' | 'my') => ({type: 'PACK/SET_PACK_OWNER', owner} as const)
export const setMinMaxSort = (range: number[]) => ({type: 'PACK/SET_MIN_MAX_SORT', range} as const)


// --- thunk
export const fetchCardsPack = (): ThunkType => async (dispatch: DispatchActionType, getState: () => AppRootStateType) => {
    const packState = getState().pack
    const params: PackQueryParams = {
        packName: packState.packName,
        page: packState.page,
        pageCount: packState.pageCount,
        sortPacks: (packState.order === 'desc' ? 0 : 1) + packState.sortBy,
        max: packState.maxSort,
        min: packState.minSort,
        user_id: (packState.packOwner === 'all' ? '' : getState().login.data._id)
    }
    try {
        dispatch(setLoadingStatus('loading'))
        const res = await CardsPackAPI.getPack(params)
        dispatch(setCardPacks(res.data.cardPacks))
        const info: PackCardsInfo = {
            page: res.data.page,
            pageCount: res.data.pageCount,
            cardPacksTotalCount: res.data.cardPacksTotalCount,
            minCardsCount: res.data.minCardsCount,
            maxCardsCount: res.data.maxCardsCount,
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
    | ReturnType<typeof setSortBy>
    | ReturnType<typeof setPackOwner>
    | ReturnType<typeof setMinMaxSort>

type PackCardsInfo = {
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number // 103
    token: string
    tokenDeathTime: number
}

type PackInitStateType = Pack & {
    packName: string
    sortBy: string
    order: 'desc' | 'asc'
    packOwner: 'all' | 'my'
    minSort: number
    maxSort: number
}