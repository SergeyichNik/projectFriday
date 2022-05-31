import React from 'react';
import classes from "./CommonStyle.module.css";
import SuperInputText from "../components/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../components/common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../components/common/c3-SuperCheckbox/SuperCheckbox";
import {api} from "../api/api";
const TestPage = () => {

    const handler = () => {
        api.registration("gipis67316@nifect.com", "qwertyqwerty")
            .then(res => {
                console.log(res)
            })
            .catch(res => {
                console.log(res.response.data.error)
            })
    }

    const handlerRecovery = () => {
        api.recoveryPassword("gipis67316@nifect.com")
            .then(res => {
            console.log(res)
            })
            .catch(e => {
                const error = e.response
                    ? e.response.data.error
                    : e.message
                console.log(error)
            })
    }

    return (
        <div className={classes.common}>
             <h1>TEST PAGE</h1>
            <SuperInputText/>
            <div>
                <SuperButton/>
                <SuperCheckbox/>

                <div >
                    <button onClick={() => api.getPing().then(console.log)}> Fetch...</button>
                    <button onClick={handler}> Registration</button>
                    <button onClick={handlerRecovery}> PassRecovery</button>
                </div>

            </div>

        </div>
    );
};

export default TestPage;