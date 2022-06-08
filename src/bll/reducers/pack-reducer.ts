import {AppRootStateType, DispatchActionType, ThunkType} from '../store/store';
import {CardsPackAPI, Pack, PackCard, PackQueryParams} from '../../api/pack-api';
import {setAppError, setLoadingStatus} from './app-reducer';

const initialState: PackInitStateType = {
    cardPacks: [],
    page: 1,
    pageCount: 5,
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
    maxSort: 0
}

export const packReducer = (state: PackInitStateType = initialState, action: PackReducerActionsType): PackInitStateType => {

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
        case "PACK/SET_PAGE":
            return {...state, page: action.page}
        case "PACK/SET_PAGE_COUNT":
            return {...state, pageCount: action.pageCount}
        case "PACK/SET_PACK_NAME":
            return {...state, ...action}
        case 'PACK/ADD_NEW_PACK':
            const newCardPack: PackCard = {...action.cardsPack}
            return {...state, cardPacks: [newCardPack, ...state.cardPacks]}
        default: return state
    }
}


// --- action
const setCardPacks = (cardPacks: PackCard[]) => ({type: 'PACK/SET_CARD_PACKS', cardPacks} as const)
const setCardPacksInfo = (cardPacksInfo: PackCardsInfo) => ({type: 'PACK/SET_CARD_PACKS_INFO', cardPacksInfo} as const)
export const setSortBy = (sortBy: string) => ({type: 'PACK/SET_SORT_BY', sortBy} as const)
export const setPackOwner = (owner: 'all' | 'my') => ({type: 'PACK/SET_PACK_OWNER', owner} as const)
export const setMinMaxSort = (range: number[]) => ({type: 'PACK/SET_MIN_MAX_SORT', range} as const)
export const setPage = (page: number) => ({type: 'PACK/SET_PAGE', page} as const)
export const setPageCount = (pageCount: number) => ({type:'PACK/SET_PAGE_COUNT', pageCount} as const)
export const setSearchPackName = (packName: string) => ({type: 'PACK/SET_PACK_NAME', packName} as const)
export const addNewPack = (cardsPack: PackCard) => ({type: 'PACK/ADD_NEW_PACK', cardsPack} as const)

// --- thunk
export const fetchCardsPack = (): ThunkType => async (dispatch: DispatchActionType, getState: () => AppRootStateType) => {
    const state = getState()

    const params: PackQueryParams = {
        packName: state.pack.packName,
        page: state.pack.page,
        pageCount: state.pack.pageCount,
        sortPacks: (state.pack.order === 'desc' ? 0 : 1) + state.pack.sortBy,
        max: state.pack.maxSort,
        min: state.pack.minSort,
        user_id: (state.pack.packOwner === 'all' ? '' : state.login.data._id)
    }
    try {
        dispatch(setLoadingStatus('loading'))
        debugger
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
        debugger
        dispatch(setCardPacksInfo(info))

    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setAppError(error))
    } finally {
        dispatch(setLoadingStatus('idle'))
    }
}

export const addCardPack = (): ThunkType => async(dispatch: DispatchActionType) => {
    const newName = 'JS/React/Redux'
    try {
        dispatch(setLoadingStatus('loading'))
        const res = await CardsPackAPI.addNewPack(newName)
        dispatch(fetchCardsPack())
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setAppError(error))
    }
    finally {
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
    | ReturnType<typeof setPage>
    | ReturnType<typeof setPageCount>
    | ReturnType<typeof setSearchPackName>
    | ReturnType<typeof addNewPack>

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

//selector
export const selectPack = (state: AppRootStateType) => state.pack