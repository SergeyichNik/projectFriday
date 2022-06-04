import React from 'react';
import Button from '@mui/material/Button';

import classes from '../CommonStyle.module.css';
import {useAppDispatch, useAppSelector} from '../../bll/store/store';
import {Navigate} from 'react-router-dom';
import {LoadingStatusType, logOut} from '../../bll/reducers/app-reducer';
import Grid from '@mui/material/Grid';
import {IconButton, TextField} from '@mui/material';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import {Formik, Form, ErrorMessage} from 'formik';

import '../../styles/common.css';
import styles from './Profile.module.css';

import userAvatar from './assets/user.png'
import * as Yup from 'yup';
import {ErrorText} from '../RecoveryPassword/ErrorText/ErrorText';

type InitialValuesType = {
    nickname: string
    email: string
}

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    nickname: Yup.string().required('Nick, please').min(3, 'minimum 3 symbols')
})

const Profile = () => {
    const dispatch = useAppDispatch()

    const isAuth = useAppSelector<boolean>(state => state.login.isAuth)
    const loadingStatus = useAppSelector<LoadingStatusType>(state => state.appReducer.loadingStatus)

    const initialValues: InitialValuesType = {
        email: '',
        nickname: ''
    }

    const onSubmit = (values: InitialValuesType) => {
        console.log(values)
    }

    const onClickLogOutHandler = () => {
        dispatch(logOut())
    }

    if (!isAuth) return <Navigate to={'/login'}/>

    return (
        <>
            <Grid container className={'containerGrid'}>
                <Grid className={'itemInner'}>
                    <div className={styles.wrapper}>
                        <div>Personal Information</div>

                        <div className={styles.userPhoto}>
                            <div className={styles.userPhotoInner}><img src={userAvatar} alt={'user photo'}/></div>
                            <IconButton className={styles.svgPosition} size={'small'}>
                                <PhotoCameraOutlinedIcon/>
                            </IconButton>
                        </div>

                        <div className={styles.formWrapper}>
                            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={SignupSchema}>
                                {
                                    (formik) => {
                                        console.log(formik)
                                        return (
                                            <Form>
                                                <div style={{position: 'relative', marginTop: 20}}><>

                                                    <TextField id={'nickname'}
                                                               label={'Nickname'}
                                                               variant={'standard'}
                                                               autoComplete={'off'}
                                                               error={!!formik.touched.nickname && !!formik.errors.nickname}
                                                               fullWidth
                                                               disabled={loadingStatus === 'loading'}
                                                               {...formik.getFieldProps('nickname')}/>
                                                    <ErrorMessage
                                                        name={'nickname'}
                                                        component={ErrorText}
                                                    />
                                                </>
                                                </div>
                                                <div style={{position: 'relative', marginTop: 20}}>
                                                    <TextField id={'email'}
                                                               label={'Email'}
                                                               variant={'standard'}
                                                               autoComplete={'off'}
                                                               error={!!formik.touched.email && !!formik.errors.email}
                                                               fullWidth
                                                               disabled={loadingStatus === 'loading'}
                                                               {...formik.getFieldProps('email')}/>
                                                    <ErrorMessage
                                                        name={'email'}
                                                        component={ErrorText}
                                                    />
                                                </div>
                                            </Form>
                                        )
                                    }
                                }
                            </Formik>
                        </div>

                    </div>
                </Grid>
            </Grid>


            <div className={classes.common}>
                <h1>PROFILE</h1>

                <Button variant={'contained'}
                        onClick={onClickLogOutHandler}
                >Log out</Button>
            </div>
        </>


    );
};

export default Profile;