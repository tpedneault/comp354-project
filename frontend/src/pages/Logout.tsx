import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../App';

function Logout() {
    const navigate = useNavigate();
    const {userID, setUserID} = useGlobalContext();
    localStorage.setItem('userID', "0");
    setUserID(0);
    setTimeout(function(){
        navigate("/SignIn");
    },400);
    return (
        <div>
        </div>
    )
}
export default Logout;