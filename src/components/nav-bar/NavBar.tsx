import React from 'react';
import {CustomLink} from "../../utilities/CustomLink";

const NavBar = () => {
    return (
        <>
            <CustomLink to={'/'}>Profile</CustomLink>
            <CustomLink to={'pack-table'}>Packs list</CustomLink>

        </>
    );
};

export default NavBar;