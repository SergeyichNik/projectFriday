import React from 'react';
import classes from './CommonStyle.module.css';
import * as Yup from 'yup';
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    FormGroup,
    Grid,
    TextField
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../bll/reducers/login-reducer";
import {AppRootStateType} from "../bll/store/store";
import {Link, Navigate} from "react-router-dom";
import {useFormik} from "formik";

const styleBtn = {
    borderRadius: '18px',
    margin: "100px auto 30px",
    width: "266px",
    height: "36px",
    textTransform: "none",
    backgroundColor: "#21268F",
    fontSize: "16px",
    fontWeight: "400",
    color: "#ECECF9",
}
const styleForm = {
    marginTop: "84px auto",
    textAlign: 'center',
    width: "413px",
    height: '580px',
    borderRadius: "8px",
    backgroundColor: "#fff",
}
const styleInput = {
    margin: "10px auto 0",
    width: "347px",
}
const rememberMe = {
    width: "347px",
    margin: "20px auto 10px ",
    color: "#2D2E46",
}
const styleH1 = {
    lineHeight: "39px",
    fontWeight: "700",
    fontSize: "26px",
    color: "#2D2E46",
}
const styleH2 = {
    fontWeight: "700",
    fontSize: "22px",
    lineHeight: "33px",
    color: "#2D2E46",
}
const styleP = {
    color: "#2D2E46",
    opacity: "0.5",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "24px",
}
const forgotPassword = {
    width: '101px',
    height: '17px',
    fontFamily: 'SF UI Display',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '17px',
    textDecoration: 'none',
    color: '#2D2E46',
}
const signUp = {
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#21268F",
    textDecoration: "none",
}

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
            password: Yup.string().required('Required').min(7, 'Minimum 7 symbols'),
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
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl sx={styleForm} style={{padding: '20px'}} variant={"filled"}>
                            <FormLabel>
                                <h1 style={styleH1}>It-incubator</h1>
                                <h2 style={styleH2}>Sign In</h2>
                            </FormLabel>
                            <FormGroup>
                                <TextField
                                    style={styleInput}
                                    label={'email'}
                                    variant="standard"
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email
                                    && formik.errors.email
                                    && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                                <TextField
                                    variant="standard"
                                    style={styleInput}
                                    label={'password'}
                                    type={'password'}
                                    {...formik.getFieldProps('password')}
                                />
                                {formik.touched.password
                                    && formik.errors.password
                                    && <div style={{color: 'red'}}>{formik.errors.password}</div>}
                                <FormControlLabel
                                    style={rememberMe}
                                    label={'Remember me'}
                                    control={<Checkbox checked={formik.values.rememberMe}/>}
                                    {...formik.getFieldProps('rememberMe')}
                                />
                                <div>
                                    <Link style={forgotPassword} to={'/recovery-password'}>Forgot Password</Link>
                                </div>
                                <Button sx={styleBtn} type={'submit'}>Login</Button>
                                {formik.status && <div style={{color: 'red'}}>{formik.status}</div>}
                                <FormLabel>
                                    <p style={styleP}>Don't have an account?</p>
                                    <Link style={signUp} to={'/registration'}>Sign Up</Link>
                                </FormLabel>
                            </FormGroup>
                        </FormControl>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
};

export default Login;