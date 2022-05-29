import React from 'react';
import {ErrorMessage, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {Button, Container, Grid, TextField, Typography} from '@mui/material';
import { Link } from 'react-router-dom';

type InitialValuesType = {
    email: string
}

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required')
})

const RecoveryPassword = () => {

    const initialValues: InitialValuesType = {
        email: ''
    }

    const onSubmit = (values: InitialValuesType) => {
        console.log('Values: ', values)
    }

    console.log(initialValues)

    const forCont: React.CSSProperties = {
        background: '#ccc',
        height: '93.82vh',
        maxWidth: 2150
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

    const forGr = {
        background: '#F9F9FE'
    }

    return (
        <>
            <Container sx={forCont} maxWidth={false}>
                <Grid container justifyContent={'center'} alignItems={'center'} height={'100%'}>
                    <Grid sx={forGr} sm={2.5} justifyContent={'center'} textAlign={'center'} padding={3}
                          borderRadius={2}>

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
                                                           {...formik.getFieldProps('email')}/>
                                                <ErrorMessage
                                                    name={'email'}
                                                    render={msg => <div
                                                        style={{color: 'red', fontWeight: 'bold', position: 'absolute',
                                                        bottom: '-24px', left: 0}}>{msg}</div>}/>


                                                {/*<label htmlFor={'email'}>*/}
                                                {/*    <Field*/}
                                                {/*        type={'text'}*/}
                                                {/*        name={'email'}*/}
                                                {/*        id={'email'}*/}
                                                {/*        placeholder={'Email'}/>*/}
                                                {/*    <ErrorMessage*/}
                                                {/*        name={'email'}*/}
                                                {/*        render={msg => <div style={{color: 'red', fontWeight: 'bold'}}>{msg}</div>}/>*/}
                                                {/*</label>*/}
                                            </div>

                                            <Typography variant={'body2'} marginTop={'30px'} marginBottom={'90px'}
                                                        align={'left'} color={'#9293a2'}>
                                                Enter your email address and we will send you further instructions
                                            </Typography>

                                            <div>
                                                <Button variant="contained" style={{fontWeight: 'bold'}}>
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
            </Container>
        </>
    );
};

export default RecoveryPassword;