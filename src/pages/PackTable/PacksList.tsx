import React from 'react';
import {TablePack} from './TablePack';
import {useAppDispatch, useAppSelector} from '../../bll/store/store';
import {fetchCardsPack} from '../../bll/reducers/pack-reducer';
import {PackCard} from '../../api/packAPI';
import styles from '../Profile/Profile.module.css';
import {RangeCards} from './RangeCards/RangeCards';
import {OwnerSwitcher} from './OwnerSwitcher/OwnerSwitcher';
import SearchField from "../../components/common/SearchField/SearchField";

export const PacksList = () => {
    const dispatch = useAppDispatch()

    const pack = useAppSelector<PackCard[]>(state => state.pack.cardPacks)
    const sortBy = useAppSelector<string>(state => state.pack.sortBy)
    const order = useAppSelector<'desc' | 'asc'>(state => state.pack.order)
    const owner = useAppSelector<'all' | 'my'>(state => state.pack.packOwner)
    const maxCardsCount = useAppSelector<number>(state => state.pack.maxCardsCount)
    const minCardsCount = useAppSelector<number>(state => state.pack.minCardsCount)
    const maxSort = useAppSelector<number>(state => state.pack.maxSort)
    const minSort = useAppSelector<number>(state => state.pack.minSort)

    React.useEffect(() => {
        dispatch(fetchCardsPack())
    }, [sortBy, order, owner, minSort, maxSort])

    return (
        <div style={{margin: '30px auto', maxWidth: '850px' }}>
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
            </div>
        </div>
    </div>
    );
};
