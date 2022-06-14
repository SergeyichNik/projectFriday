import React from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "../layout/Layout";
import Login from "../../pages/Login/Login";
import Profile from "../../pages/Profile/Profile";
import RecoveryPassword from "../../pages/RecoveryPassword/RecoveryPassword";
import NewPassword from "../../pages/new-password/NewPassword";
import TestPage from "../../pages/TestPage";
import Registration from "../../pages/Registration/Registration";
import NotFound from "../../pages/NotFound";
import {PacksList} from '../../pages/PackTable/PacksList';
import CardsList from "../../pages/CardsTable/CardsList";
import LearnPack from "../../pages/Card/LearnPack";
import {RequireAuth} from "../../hoc";

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
                <Route path={'pack-table'} element={
                    <RequireAuth>
                        <PacksList/>
                    </RequireAuth>
                } />
                <Route path={'cards/:id'} element={<CardsList/>} />
                <Route path={'*'} element={<NotFound/>}/>
                <Route path={'card/:id'} element={<LearnPack/>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;