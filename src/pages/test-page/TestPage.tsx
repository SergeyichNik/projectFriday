import React from 'react';
import SuperInputText from "../../components/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../components/common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../components/common/c3-SuperCheckbox/SuperCheckbox";

const TestPage = () => {
    return (
        <div>
            Test page
            <div>
                <SuperInputText/>
            </div>
            <div>
                <SuperCheckbox/>
                <SuperButton/>
            </div>
        </div>
    );
};

export default TestPage;