import React, {ComponentType} from 'react';
import {Route, Routes} from "react-router-dom";
import {routesKit} from "./routes";
import NavBar from "../nav-bar/NavBar";

const custom = (Element: ComponentType) => {
    return <Element/>
}
const AppRouter = () => {
    return (
        <div>
            <NavBar/>
            <hr/>
            <Routes>
                {routesKit.map(({path,element}) => {
                    return <Route path={path} element={custom(element)}/>
                })}
            </Routes>
        </div>
    );
};

export default AppRouter;