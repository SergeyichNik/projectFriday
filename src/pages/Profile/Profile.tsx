import styles from './Profile.module.css'

import React from 'react';
import Button from '@mui/material/Button';
import {logOut} from '../../bll/reducers/app-reducer';
import {Navigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../bll/store/store';
import {EditProfile} from './EditProfile/EditProfile';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {fetchCardsPack} from '../../bll/reducers/pack-reducer';
import {TablePack} from '../PackTable/TablePack';


const Profile = () => {
    const dispatch = useAppDispatch()

    const isAuth = useAppSelector<boolean>(state => state.login.isAuth)
    const avatar = useAppSelector<string | undefined>(state => state.login.data.avatar)
    const name = useAppSelector<string>(state => state.login.data.name)

    const [editMode, setEditMode] = React.useState(false)

    const onClickChangeEditModeHandler = () => {
        setEditMode(!editMode)
    }

    const onClickLogOutHandler = () => {
        dispatch(logOut())
    }

    const getpar = () => {
        dispatch(fetchCardsPack())
    }

    if (!isAuth) return <Navigate to={'/login'}/>

    return (
        <>
            {!editMode
                ? <div className={styles.profileContainer}>
                    <div className={styles.sidebar}>

                        <ProfileInfo avatar={avatar}
                                     name={name}
                                     editMode={editMode}
                                     onClickChangeEditModeHandler={onClickChangeEditModeHandler}/>

                        <div style={{textAlign: 'center', margin: '10px 0'}}>
                            <Button variant={'contained'}
                                    onClick={onClickLogOutHandler}>
                                Log out
                            </Button>

                            <div onClick={getpar}>UP</div>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <TablePack />
                    </div>
                </div>

                : <EditProfile avatar={avatar}
                               name={name}
                               editMode={editMode}
                               onClickChangeEditModeHandler={onClickChangeEditModeHandler}
                />}
        </>
    );
};

export default Profile;