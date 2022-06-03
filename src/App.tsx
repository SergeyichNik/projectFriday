import React from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom';
import AppRouter from './components/app-router/AppRouter';
import ErrorSnackbar from './components/common/c7-ErrorSnackbar/ErrorSnackbar';
import {Loader} from './components/common/Loader/Loader';
import {useAppDispatch, useAppSelector} from './bll/store/store';
import {authMe, LoadingStatusType} from './bll/reducers/app-reducer';

function App() {
    const dispatch = useAppDispatch()

    const loadingStatus = useAppSelector<LoadingStatusType>(state => state.appReducer.loadingStatus)
    const isInitialize = useAppSelector<boolean>(state => state.appReducer.isInitialized)

    React.useEffect(() => {
            dispatch(authMe())
    }, [])

    if (!isInitialize) return <Loader />

    return (
        <HashRouter>
            {loadingStatus === 'loading' && <Loader/>}
            <ErrorSnackbar/>
            <AppRouter/>
        </HashRouter>
    );
}

export default App;
