import React from 'react';
import './App.css';
import {BrowserRouter, Routes} from "react-router-dom";
import AppRouter from "./components/app-router/AppRouter";

function App() {
  return (
    <BrowserRouter basename={'/projectFriday'}>
        <AppRouter/>
        ref
    </BrowserRouter>
  );
}

export default App;
