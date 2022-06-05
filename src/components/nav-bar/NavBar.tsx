import React from 'react';
import classes from "./NavBar.module.css";
import {CustomLink} from "../../utilities/CustomLink";

const NavBar = () => {
    return (
        <>
            <CustomLink to={'/'}>Profile</CustomLink>
            <CustomLink to={'login'}>Login</CustomLink>
            <CustomLink to={'recovery-password'}>Recovery Password</CustomLink>
            <CustomLink to={'new-password'}>New Password</CustomLink>
            <CustomLink to={'test-page'}>Test Page</CustomLink>
            <CustomLink to={'registration'}>Registration</CustomLink>

            <CustomLink to={'pack-table'}>Packs list</CustomLink>
        </>
    );
};

export default NavBar;