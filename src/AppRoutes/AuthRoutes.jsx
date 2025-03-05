import SignIn from "../Pages/Auth/SignIn";
import SignUp from "../Pages/Auth/SignUp";
import Unprotected from "./Protected/Unprotected";
import NotFound from "../Components/Other/404";

const AuthRoute = [{
    element: <Unprotected />,
    errorElement: <NotFound />,
    children: [
        {
            path: "/signin",
            element: <SignIn />
        },
        {
            path: "/signup",
            element: <SignUp />
        }
    ]
}];

export default AuthRoute;