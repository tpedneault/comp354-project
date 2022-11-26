import * as React from "react";
import "./App.css";
//import Login from "./login/Login";
import { createContext, useContext, useState } from "react";

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
import { Logout } from '@mui/icons-material';
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 5,
    },
  },
});

export type GlobalContent = {
    userID: number;
    setUserID: (userID: number) => void;
}
export const MyGlobalContext = createContext<GlobalContent>({
    userID: 1,
    setUserID: () => { },
})
export const useGlobalContext = () => useContext(MyGlobalContext);

function App() {
  const [userID, setUserID] = useState(1);
  return (
    <MyGlobalContext.Provider value={{ userID, setUserID }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="SignIn" element={<SignIn />} />
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
    </MyGlobalContext.Provider>
  );
}
export default App;
