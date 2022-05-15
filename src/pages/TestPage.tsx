import React from 'react';
import classes from "./CommonStyle.module.css";
import SuperInputText from "../components/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../components/common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../components/common/c3-SuperCheckbox/SuperCheckbox";
const TestPage = () => {
    return (
        <div className={classes.common}>
             <h1>TEST PAGE</h1>
            <SuperInputText/>
            <div>
                <SuperButton/>
                <SuperCheckbox/>
            </div>

        </div>
    );
};

export default TestPage;