import React from 'react';
import {ErrorMessage, Form, Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import {Button, Grid, TextField, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import {ErrorText} from './ErrorText/ErrorText';
import {RequestProgressStatusType, sendPasswordRecovery} from '../../bll/reducers/recoveryPassword-reducer';
import {useAppDispatch, useAppSelector} from './hooks/typedHooks';


export type InitialValuesType = {
    email: string
}

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required')
})

const RecoveryPassword = () => {
    const dispatch = useAppDispatch()

    const progressStatus = useAppSelector<RequestProgressStatusType>(state => state.recoverPassword.progressStatus)

    const initialValues: InitialValuesType = {
        email: ''
    }

    const onSubmit = (values: InitialValuesType, {resetForm}: FormikHelpers<InitialValuesType>) => {
        dispatch(sendPasswordRecovery(values.email))
        resetForm()
    }

    const forTypoH: React.CSSProperties = {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 26,
        lineHeight: '39px',
        color: '#2D2E46'
    }

    const forTypoP = {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 22,
        lineHeight: '33px',
        color: '#2D2E46'
    }

    const forGr: React.CSSProperties = {
        background: '#F9F9FE',
        marginTop: '84px',
        width: '413px',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: '8px',
        padding: '24px'
    }

    return (
        <>
            <Grid container justifyContent={'center'} alignItems={'center'} height={'100%'}>
                <Grid sx={forGr}>

                    <Typography sx={forTypoH} variant={'h1'} marginBottom={'30px'}>
                        It-incubator</Typography>
                    <Typography sx={forTypoP} variant={'body1'} marginBottom={'56px'}>
                        Forgot your password?</Typography>

                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={SignupSchema}>
                        {
                            (formik) => {
                                return (
                                    <Form>
                                        <div style={{position: 'relative'}}>
                                            <TextField variant={'standard'} fullWidth
                                                       autoComplete={'off'}
                                                       error={!formik.isValid}
                                                       id={'email'} label={'email'}
                                                       disabled={progressStatus === 'loading'}
                                                       {...formik.getFieldProps('email')}/>
                                            <ErrorMessage
                                                name={'email'}
                                                render={msg => <ErrorText errorText={msg}/>}
                                            />
                                        </div>

                                        <Typography variant={'body2'} marginTop={'30px'} marginBottom={'90px'}
                                                    align={'left'} color={'#9293a2'}>
                                            Enter your email address and we will send you further instructions
                                        </Typography>

                                        <div>
                                            <Button type={'submit'} variant="contained"
                                                    disabled={progressStatus === 'loading'}
                                                    style={{fontWeight: 'bold'}}>
                                                Send Instructions
                                            </Button>
                                        </div>
                                    </Form>
                                )
                            }
                        }
                    </Formik>

                    <div style={{margin: '30px 0 10px', color: '#9293a2', textAlign: 'center'}}>Did you remember
                        your password?
                    </div>
                    <div style={{marginBottom: 10, textAlign: 'center'}}>
                        <Link to={'/login'}>Try logging in</Link>
                    </div>
                </Grid>
            </Grid>
        </>
    );
};

export default RecoveryPassword;