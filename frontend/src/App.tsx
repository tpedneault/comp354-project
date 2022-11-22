import * as React from "react";
import "./App.css";
//import Login from "./login/Login";
import { useState } from "react";

import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals'; 
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import Layout from './pages/Layout';
import Login from './pages/Login';
import { Logout } from '@mui/icons-material';
import Register from "./pages/Register";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route path="Logout" element={<Logout />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="Goals" element={<Goals />} />
            <Route path="Statistics" element={<Statistics />} />
            <Route path="Settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
export default App;
