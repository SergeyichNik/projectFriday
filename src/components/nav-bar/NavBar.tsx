import React from 'react';
import {routesKit} from "../app-router/routes";
import {Link} from "react-router-dom";
import classes from "./NavBar.module.css";

const NavBar = () => {
    return (
        <div className={classes.wrapper}>
            {routesKit.map(({path, linkName}) => {
                return <Link to={path} >{linkName}</Link>
            })}
        </div>
    );
};

export default NavBar;