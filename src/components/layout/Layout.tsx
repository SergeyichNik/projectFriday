import React from 'react';
import {Outlet} from "react-router-dom";
import classes from "./Layout.module.css";
import NavBar from "../nav-bar/NavBar";

const Layout = () => {
    return (
        <>
            <header className={classes.header}>
                <NavBar/>
            </header>
            <Outlet/>
        </>
    );
};

export default Layout;