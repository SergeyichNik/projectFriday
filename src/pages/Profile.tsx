import React from 'react';
import Button from '@mui/material/Button';

import classes from './CommonStyle.module.css';
import {useAppDispatch, useAppSelector} from '../bll/store/store';
import {Navigate} from 'react-router-dom';
import {logOut} from '../bll/reducers/app-reducer';


const Profile = () => {
    const dispatch = useAppDispatch()

    const isAuth = useAppSelector<boolean>(state => state.login.isAuth)

    const onClickLogOutHandler = () => {
        dispatch(logOut())
    }

    if (!isAuth) return <Navigate to={'/login'}/>

    return (
        <div className={classes.common}>
            <h1>PROFILE</h1>

            <Button variant={'contained'}
                    onClick={onClickLogOutHandler}
            >Log out</Button>
        </div>
    );
};

export default Profile;