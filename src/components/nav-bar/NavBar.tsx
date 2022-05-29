import React from 'react';
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
        </>
    );
};

export default NavBar;