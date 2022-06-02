import React from 'react';
import {Button, TextField, Typography} from '@mui/material';
import {ErrorMessage, Form, Formik, FormikHelpers} from 'formik';
import {ErrorText} from '../ErrorText/ErrorText';
import {Link} from 'react-router-dom';
import {
    ErrorInfoType,
    Nullable,
    RequestProgressStatusType,
    sendPasswordRecovery
} from '../../../bll/reducers/recoveryPassword-reducer';
import * as Yup from 'yup';
import {useAppDispatch, useAppSelector } from '../../../bll/store/store';


type RecoveryPasswordPropsType = {
    errorInfo: Nullable<ErrorInfoType>
}

export type InitialValuesType = {
    email: string
}

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required')
})

export const RecoveryPasswordForm: React.FC<RecoveryPasswordPropsType> = ({errorInfo}) => {

    const dispatch = useAppDispatch()
    const progressStatus = useAppSelector<RequestProgressStatusType>(state => state.recoverPassword.progressStatus)

    const initialValues: InitialValuesType = {
        email: ''
    }

    const onSubmit = (values: InitialValuesType, {resetForm}: FormikHelpers<InitialValuesType>) => {
        dispatch(sendPasswordRecovery(values.email))
        resetForm()
    }

    const forgot = {
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 22,
        lineHeight: '33px',
        color: '#2D2E46'
    }

    return (
        <>
            <Typography sx={forgot} variant={'body1'} marginBottom={'56px'}>
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

                                    <div>{errorInfo && errorInfo.email} {errorInfo && errorInfo.error}</div>
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
        </>
    );
};
