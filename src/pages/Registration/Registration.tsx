import React from 'react';
import {useFormik} from "formik";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../bll/store/store";
import {setRegistrationTC} from "../../bll/reducers/registration-reducer";
import {Navigate, NavLink} from "react-router-dom";
import {Button, FormControl, IconButton, Input, InputAdornment, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";


const styleBtn = {
    borderRadius: '18px',
    /*margin: "60px 0px 0px 190px",*/
    width: "160px",
    height: "30px",
    textTransform: "none",
    backgroundColor: "#21268F",
    fontSize: "16px",
    fontWeight: "400",
    color: "#ECECF9",
}
const styleForm = {
    marginTop: "2%",
    marginBottom: "2%",
    marginLeft: "35%",
    textAlign: 'center',
    width: "413px",
    height: "480px",
    borderRadius: "8px",
    backgroundColor: "#fff",
}
const styleInput = {
    margin: "20px 33px 0 33px",
    width: "347px",
}
const styleH1 = {
    marginTop: "25px",
    lineHeight: "39px",
    fontWeight: "700",
    fontSize: "26px",
}
const styleH2 = {
    fontWeight: "700",
    fontSize: "22px",
    lineHeight: "33px",
}
const styleLink = {
    backgroundColor: "#D7D8EF",
    color: "#21268F",
    textDecoration: "none",
    width: "120px",
    height: "30px",
    borderRadius: "18px",
    fontWeight: "400",
    fontSize: "16px",
    marginRight: "140px"
}
const styleButtons = {
    width: "347px",
    margin: "60px 33px 0 33px",
}

type FormikErrorType = {
    email?: string
    password?: string
}

export const Registration = () => {

    const [hidden, setHidden] = React.useState(true);

    const handleClickShowPassword = () => {
        setHidden(!hidden)
    };

    const dispatch = useAppDispatch();
    const isRegisteredIn = useSelector<AppRootStateType, boolean>(state => state.registration.isRegistered);
    const errorFromServer = useSelector<AppRootStateType, string | null>(state => state.registration.error);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password is required';
            } else if (values.password.length <= 7) {
                errors.password = 'Password should be more than 7 symbols';
            }
            return errors;
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
        <FormControl sx={styleForm} variant={"filled"}>
            <h1 style={styleH1}>It-incubator</h1>
            <h2 style={styleH2}>Sign Up</h2>
            { errorFromServer && <div style={{color: "red"}}>{errorFromServer}</div>}
            <form onSubmit={formik.handleSubmit}>
                <TextField id={"standard-basic"}
                           label={"Email"}
                           variant={"standard"}
                           style={styleInput}
                           {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email &&
                    <div style={{color: 'red', fontSize: "small"}}>{formik.errors.email}</div>}
                <Input style={styleInput}
                       placeholder={"Password"}
                       id="standard-adornment-password"
                       type={hidden ? 'password' : 'text'}
                       {...formik.getFieldProps("password")}

                       endAdornment={
                           <InputAdornment position="end">
                               <IconButton
                                   aria-label="toggle password visibility"
                                   onClick={handleClickShowPassword}
                               >
                                   {!hidden ? <VisibilityOff/> : <Visibility/>}
                               </IconButton>
                           </InputAdornment>
                       }
                />
                {formik.touched.password && formik.errors.password &&
                    <div style={{color: 'red', fontSize: "small"}}>{formik.errors.password}</div>}
                <div style={styleButtons}>
                    <NavLink to={'/login'} style={styleLink}>Cancel</NavLink>
                    <Button type={'submit'}
                            variant={'contained'}
                            sx={styleBtn}>
                        Register
                    </Button>
                </div>
            </form>
        </FormControl>
    );
};

export default Registration;