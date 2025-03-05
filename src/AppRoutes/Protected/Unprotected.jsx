import React from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Firebase/firebaseConfig"
import { Navigate,Outlet } from 'react-router-dom';



const Unprotected = () => {
    const [user, loading] = useAuthState(auth);


    if(loading){
        return <div>Loading...</div>
    }

    return !user ? <Outlet /> : <Navigate to="/admin" />
  
}

export default Unprotected