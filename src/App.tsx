import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/app-router/AppRouter";

function App() {
  return (
    <BrowserRouter basename={'/projectFriday'}>
        <AppRouter/>
    </BrowserRouter>
  );
}

export default App;