import * as React from 'react';
import './App.css';
//import Login from "./login/Login";
import {useState} from 'react';

import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";

import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals'; 
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import Layout from './pages/Layout';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="Goals" element={<Goals />} />
                    <Route path="Statistics" element={<Statistics />} />
                    <Route path="Settings" element={<Settings />} />
                </Route>
           
            </Routes>
      </BrowserRouter>
    );
}
export default App;