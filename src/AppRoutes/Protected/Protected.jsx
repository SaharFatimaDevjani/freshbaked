import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet } from 'react-router-dom'
import { auth } from '../../Firebase/firebaseConfig';

const Protected = () => {
    const [user,loading]=useAuthState(auth)
    console.log(user)


    if (loading){
        return <div>Loading...</div>
    }
    return  user ? <Outlet /> : <Navigate to="/signin" />
      
    }
 


export default Protected