import React, {useState} from 'react';
import {TablePack} from './TablePack';
import {useAppDispatch, useAppSelector} from '../../bll/store/store';
import {
    fetchCardsPack,
    selectPack,
    setPackOwner,
    setPage,
    setPageCount,
    setSearchPackName
} from '../../bll/reducers/pack-reducer';
import {PackCard} from '../../api/pack-api';
import {RangeCards} from './RangeCards/RangeCards';
import {OwnerSwitcher} from './OwnerSwitcher/OwnerSwitcher';
import SearchField from '../../components/common/SearchField/SearchField';
import {Pagination} from '../../components/common/Pagination/Pagination';
import {Button} from '@mui/material';
import {styleBtn} from '../../styles/commonMui';
import styles from '../Profile/Profile.module.css';
import stylesPL from './PacksList.module.css';
import {controlModalWindowAC} from '../../bll';


export const PacksList = () => {
    const dispatch = useAppDispatch()

    const [first, setFirst] = useState<boolean>(true)

    const packName = useAppSelector(selectPack).packName
    const pack = useAppSelector<PackCard[]>(state => state.pack.cardPacks)
    const sortBy = useAppSelector<string>(state => state.pack.sortBy)
    const order = useAppSelector<'desc' | 'asc'>(state => state.pack.order)
    const owner = useAppSelector<'all' | 'my'>(state => state.pack.packOwner)
    const maxCardsCount = useAppSelector<number>(state => state.pack.maxCardsCount)
    const minCardsCount = useAppSelector<number>(state => state.pack.minCardsCount)
    const maxSort = useAppSelector<number>(state => state.pack.maxSort)
    const minSort = useAppSelector<number>(state => state.pack.minSort)
    const page = useAppSelector<number>(state => state.pack.page)
    const pageCount = useAppSelector<number>(state => state.pack.pageCount)
    const cardsPacksTotalCount = useAppSelector<number>(state => state.pack.cardPacksTotalCount)

    const setPackPageCallback = (page: number) => {
        dispatch(setPage(page + 1));
    }
    const setPackPageCountCallback = (page: number) => {
        dispatch(setPageCount(page))
    }
    const searchByPackName = (search: string) => {
        dispatch(setSearchPackName(search))
    }

    const openAddModalWindowHandle = () => {
        dispatch(controlModalWindowAC(true, 'ADD'))
    }

    React.useEffect(() => {
        if (first) {
            dispatch(setPackOwner('all'))
            setFirst(false)
            return
        }
        dispatch(fetchCardsPack())

    }, [sortBy, order, owner, minSort, maxSort, packName, pageCount, page, first])

    return (
        <div style={{margin: '30px auto'}}>
            <div className={styles.profileContainer}>

                <div className={styles.sidebar}>
                    <OwnerSwitcher owner={owner}/>
                    <RangeCards
                        minSort={minSort}
                        maxSort={maxSort}
                        maxCardsCount={maxCardsCount}
                        minCardsCount={minCardsCount}
                    />
                </div>

                <div className={styles.content}>
                    <SearchField searchCallback={searchByPackName} placeholder={'Search'}
                                 initState={packName}/>

                    <div className={stylesPL.buttonPosition}>
                        <Button
                            sx={[styleBtn, {
                                borderRadius: '4px',
                                fontWeight: 'bold',
                                margin: '0 0 14px 0',
                                padding: '8px 16px 4px',
                                color: '#2c2b3f',
                                height: 'auto'
                            }]}
                            variant={'contained'}
                            onClick={openAddModalWindowHandle}
                        >
                            Add new Pack
                        </Button>
                    </div>

                    {pack.length === 0 && owner === 'my'
                        ? <div>You have no packs. Do you want to add?</div>
                        : <>
                            <TablePack pack={pack} sortBy={sortBy} order={order}/>

                            <Pagination page={page}
                                        pageCount={pageCount}
                                        cardsPacksTotalCount={cardsPacksTotalCount}
                                        setPageCallback={setPackPageCallback}
                                        setPageCountCallback={setPackPageCountCallback}
                            />
                        </>
                    }

                </div>
            </div>
        </div>
    );
};
