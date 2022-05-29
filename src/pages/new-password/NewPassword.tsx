import React from 'react';
import classes from "../CommonStyle.module.css";
import {Button, Card, FormControl, IconButton, Input, InputAdornment, InputLabel} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

interface State {
    amount: string;
    password: string;
    weight: string;
    weightRange: string;
    showPassword: boolean;
}

const NewPassword = () => {

    const [values, setValues] = React.useState<State>({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (



        <FormControl sx={{
            marginTop: "84px",
            width: "413px",
            height: "480px",
            borderRadius: "8px",
            backgroundColor: "#fff",
        }} variant={"filled"} className={classes.common} >
            <h1 style={{
                marginTop: "25px",
                lineHeight: "39px",
                fontWeight: "700",
                fontSize: "26px",
            }}>It-incubator</h1>
            <h2 style={{
                fontWeight: "700",
                fontSize: "22px",
                lineHeight: "33px",
            }}>Create new password</h2>
            <Input
                style={{margin: "39px 33px 0 33px", width: "347px"}}
                placeholder={"Password"}
                id="standard-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            <p style={{
                margin: "30px 33px 0 33px",
                color: "#2D2E46",
                opacity: "0.5",
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "24px",
                textAlign: "left" ,
            }}>Create new password and we will send you further instructions to email</p>
            <Button sx={{
                borderRadius: '18px',
                margin: "90px auto 0",
                width: "266px",
                height: "36px",
                textTransform: "none",
                backgroundColor: "#21268F",
                fontSize: "16px",
                fontWeight: "400",
                color: "#ECECF9"
            }} variant="contained">Create new password</Button>
        </FormControl>

    );
};

export default NewPassword;