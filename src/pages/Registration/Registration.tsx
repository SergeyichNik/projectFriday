import React from 'react';
import style from "./Registration.module.css";
import {useFormik} from "formik";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../bll/store/store";
import {setRegistrationTC} from "../../bll/reducers/registration-reducer";
import {Navigate} from "react-router-dom";
import {Button, FormControl, FormGroup, TextField} from "@mui/material";


export const Registration = () => {

    const dispatch = useAppDispatch();
    const isRegisteredIn = useSelector<AppRootStateType, boolean>(state => state.registration.isRegistered);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            dispatch(setRegistrationTC(values));
            formik.resetForm({});
        }
    });

    if (isRegisteredIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={style.mainBlock}>
            <div className={style.wrapper}>
                <div className={style.signUp}>Sign Up</div>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormGroup>
                            <TextField label={"Email"}
                                       margin={"normal"}
                                       {...formik.getFieldProps("email")}
                            />
                            <TextField type={"password"}
                                       label={"Password"}
                                       margin={"normal"}
                                       {...formik.getFieldProps("password")}
                            />
                            <Button type={'submit'}
                                    variant={'contained'}
                                    style={{
                                        backgroundColor: '#21268F',
                                        borderRadius: '30px',
                                        width: '187px',
                                        height: '36px'
                                    }}>
                                Register
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </div>
        </div>
    );
};

export default Registration;