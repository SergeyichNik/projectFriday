import React, {ComponentType} from 'react';
import {Route, Routes} from "react-router-dom";
import {routesKit} from "./routes";

const custom = (Element: ComponentType) => {
    return <Element/>
}
const AppRouter = () => {
    return (
        <Routes>
            {routesKit.map(({path,element}) => {
                return <Route path={path} element={custom(element)}/>
            })}
        </Routes>
    );
};

export default AppRouter;