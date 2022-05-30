import React from 'react';
import classes from "./CommonStyle.module.css";
import * as Yup from 'yup';
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    FormGroup,
    Paper,
    Grid,
    TextField} from "@mui/material";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../bll/reducers/login-reducer";
import {AppRootStateType} from "../bll/store/store";
import {Link, Navigate} from "react-router-dom";

const Login = () => {
    const useAppDispatch = () => useDispatch<any>()
    const dispatch = useAppDispatch()
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.login.isAuth)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Required').email('Invalid email format'),
            password: Yup.string().required('Required').min(6, 'Minimum 5 symbols'),
        }),
        onSubmit: (values, {setSubmitting, setStatus}) => {
            dispatch(loginTC(values.email, values.password, values.rememberMe, setStatus));
            setSubmitting(false)
            formik.resetForm();
        }
    })

    if (isAuth) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className={classes.common}>
            <Grid container justifyContent={'center'} style={{padding: '30px'}}>
                <Grid item justifyContent={'center'}>
                    <Paper style={{padding: '20px', background: 'rgb(255,250,250, 0.9)'}}>
                        <form onSubmit={formik.handleSubmit}>
                            <FormControl>
                                <FormLabel>
                                    <h1>It-incubator</h1>
                                    <h2>Sign In</h2>
                                </FormLabel>
                                <FormGroup>
                                    <TextField
                                        label={'email'}
                                        {...formik.getFieldProps('email')}
                                    />
                                    {formik.touched.email
                                        && formik.errors.email
                                        && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                                    <TextField
                                        label={'password'}
                                        type={'password'}
                                        {...formik.getFieldProps('password')}
                                    />
                                    {formik.touched.password
                                        && formik.errors.password
                                        && <div style={{color: 'red'}}>{formik.errors.password}</div>}
                                    <FormControlLabel
                                        label={'Remember me'}
                                        control={<Checkbox checked={formik.values.rememberMe}/>}
                                        {...formik.getFieldProps('rememberMe')}
                                    />
                                    <div>
                                        <Link to={'/recovery-password'}>Forgot Password</Link>
                                    </div>
                                    <Button type={'submit'}>Login</Button>
                                    {formik.status && <div style={{color: 'red'}}>{formik.status}</div>}
                                    <FormLabel>
                                        <p>Don't have an account?</p>
                                        <Link to={'/registration'}>Sign Up</Link>
                                    </FormLabel>
                                </FormGroup>
                            </FormControl>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default Login;