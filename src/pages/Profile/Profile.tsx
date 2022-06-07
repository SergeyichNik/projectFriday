import styles from './Profile.module.css'

import React from 'react';
import Button from '@mui/material/Button';
import {logOut} from '../../bll/reducers/app-reducer';
import {Navigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../bll/store/store';
import {EditProfile} from './EditProfile/EditProfile';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {fetchCardsPack} from '../../bll/reducers/pack-reducer';


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
                        </div>

                        <div style={{background: '#ddd'}}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodieveniet exercitationem
                            molestias optio, recusandae voluptatibus. Amet doloribus perspiciatis tempore! Consequuntur
                            dolorem eligendi eum, nesciunt quidem repellendus repudiandae saepe vero. Et quibusdam quos
                            similique. Aliquam blanditiis, corporis debitis delectus ea, eos labore magnam odio
                            praesentium
                            quidem quod similique voluptatem, voluptates? Eaque.
                        </div>

                    </div>
                    <div className={styles.content}>
                        Content
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