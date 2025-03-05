import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet } from 'react-router-dom'
import { auth } from '../../Firebase/firebaseConfig';
import { Box,CircularProgress } from "@mui/material";

const Protected = () => {
    const [user,loading]=useAuthState(auth)
    console.log(user)


    if (loading){
        return(
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
    }
    return  user ? <Outlet /> : <Navigate to="/signin" />
      
    }
 


export default Protected