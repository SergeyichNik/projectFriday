import React from 'react';
import classes from "./CommonStyle.module.css";
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, TextField} from "@mui/material";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../bll/reducers/login-reducer";
import {AppRootStateType} from "../bll/store/store";
import {Navigate} from "react-router-dom";

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
        onSubmit: (values) => {
            dispatch(loginTC(values.email, values.password, values.rememberMe))
            formik.resetForm()
        }
    })

    if(isAuth) {
        return <Navigate to={'profile'}/>
    }

    return (
        <div className={classes.common}>
            <h1>LOGIN</h1>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormGroup>
                        <TextField
                            label={'email'}
                            {...formik.getFieldProps('email')}
                        />
                        <TextField
                            label={'password'}
                            {...formik.getFieldProps('password')}
                        />
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox checked={formik.values.rememberMe}/>}
                            {...formik.getFieldProps('rememberMe')}
                        />
                        <Button type={'submit'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </div>
    );
};

export default Login;