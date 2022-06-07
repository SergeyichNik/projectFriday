import styles from './OwnerSwitcher.module.css'

import React from 'react';
import {useAppDispatch} from '../../../bll/store/store';
import {setPackOwner} from '../../../bll/reducers/pack-reducer';


type OwnerSwitcherPropsType = {
    owner: 'all' | 'my'
}

export const OwnerSwitcher: React.FC<OwnerSwitcherPropsType> = ({owner}) => {
    const dispatch = useAppDispatch()


    const setOwnerHandler = (owner: 'all' | 'my') => {
        dispatch(setPackOwner(owner))
    }

    return (
        <div className={styles.wrapper}>
            <div>
                Show packs cards
            </div>
            <div className={styles.owner}>
                <div className={owner === 'my' ? `${styles.ownerBtn} ${styles.activeOwner}` : styles.ownerBtn}
                     onClick={() => setOwnerHandler('my')}>My
                </div>
                <div className={owner === 'all' ? `${styles.ownerBtn} ${styles.activeOwner}` : styles.ownerBtn}
                     onClick={() => setOwnerHandler('all')}>All
                </div>
            </div>
        </div>
    );
};