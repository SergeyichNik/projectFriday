import React from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "../layout/Layout";
import Login from "../../pages/Login";
import Profile from "../../pages/Profile/Profile";
import RecoveryPassword from "../../pages/RecoveryPassword/RecoveryPassword";
import NewPassword from "../../pages/new-password/NewPassword";
import TestPage from "../../pages/TestPage";
import Registration from "../../pages/Registration/Registration";
import NotFound from "../../pages/NotFound";
import {PacksList} from '../../pages/PackTable/PacksList';

const AppRouter = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route index element={<Profile/>}/>
                <Route path={'login'} element={<Login/>}/>
                <Route path={'recovery-password'} element={<RecoveryPassword/>}/>
                <Route path={'new-password'} element={<NewPassword/>}/>
                <Route path={'test-page'} element={<TestPage/>}/>
                <Route path={'registration'} element={<Registration/>}/>

                <Route path={'pack-table'} element={<PacksList/>} />

                <Route path={'*'} element={<NotFound/>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;