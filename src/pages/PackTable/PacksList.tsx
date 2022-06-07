import React from 'react';
import {TablePack} from './TablePack';
import {useAppDispatch, useAppSelector} from '../../bll/store/store';
import {fetchCardsPack, selectPack, setPage, setPageCount} from '../../bll/reducers/pack-reducer';
import {PackCard} from '../../api/packAPI';
import styles from '../Profile/Profile.module.css';
import {RangeCards} from './RangeCards/RangeCards';
import {OwnerSwitcher} from './OwnerSwitcher/OwnerSwitcher';
import SearchField from "../../components/common/SearchField/SearchField";
import {Pagination} from "../../components/common/Pagination/Pagination";

export const PacksList = () => {
    const dispatch = useAppDispatch()

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

    React.useEffect(() => {
        dispatch(fetchCardsPack())
    }, [sortBy, order, owner, minSort, maxSort, packName, pageCount, page])

    const handleChangePage = (newPage: number) => {

        dispatch(setPage(newPage));
    };

    const handleChangeRowsPerPage = (pageCount: number) => {
        dispatch(setPageCount(pageCount))

    };

    return (
        <div style={{margin: '30px auto', minWidth: '850px'}}>
            <div className={styles.profileContainer}>
                <div className={styles.sidebar}>
                    <OwnerSwitcher owner={owner}/>
                    <RangeCards
                        // minSort={minSort}
                        //         maxSort={maxSort}
                        maxCardsCount={maxCardsCount}
                        minCardsCount={minCardsCount}
                    />
                </div>

                <div className={styles.content}>

                    <SearchField/>
                    <TablePack pack={pack} sortBy={sortBy} order={order}/>
                    <Pagination page={page}
                                pageCount={pageCount}
                                cardsPacksTotalCount={cardsPacksTotalCount}
                                handleChangePage={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </div>
        </div>
    );
};
