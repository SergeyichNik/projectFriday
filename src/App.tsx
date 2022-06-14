import React from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom';
import AppRouter from './components/app-router/AppRouter';
import ErrorSnackbar from './components/common/c7-ErrorSnackbar/ErrorSnackbar';
import {Loader} from './components/common/Loader/Loader';
import {useAppDispatch, useAppSelector} from './bll/store/store';
import {authMe} from './bll/reducers/app-reducer';
import {ModalWindow} from "./components/modal-window/ModalWindow";

function App() {
    const dispatch = useAppDispatch()

    const isInitialize = useAppSelector<boolean>(state => state.appReducer.isInitialized)

    React.useEffect(() => {
            dispatch(authMe())
    }, [])

    if (!isInitialize) return <Loader />

    return (
        <>

            <HashRouter>
                <ModalWindow/>
                <ErrorSnackbar/>
                <AppRouter/>
            </HashRouter>
        </>

    );
}

export default App;
