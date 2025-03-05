import React from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Firebase/firebaseConfig"
import { Navigate,Outlet } from 'react-router-dom';
import { Box,CircularProgress } from "@mui/material";


const Unprotected = () => {
    const [user, loading] = useAuthState(auth);


    if(loading){
        return (
            (
                <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh", 
                  width: "100vw", 
                  backgroundColor: "rgba(0, 0, 0, 0.8)", 
                  position: "fixed", 
                  top: 0,
                  left: 0,
                }}
              >
                <CircularProgress
                  sx={{
                    color: "goldenrod",
                  }}
                />
              </Box>
         
            )
        )
    }

    return !user ? <Outlet /> : <Navigate to="/admin" />
  
}

export default Unprotected