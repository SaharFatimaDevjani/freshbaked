import React from 'react';
import FrontendLayout from '../Layout/Frontend/index';
import Home from '../Pages/Frontend/Home';
import NotFound from '../Components/Other/404';
import MainMenuPage from '../Pages/Frontend/MainMenuPage';
import MenuCategories from '../Pages/Frontend/MenuCategory';

const FrontendRoute = [{
    element: <FrontendLayout />,
    errorElement: <NotFound />,
    children: [
        {
            path: "/",
            element: <Home />
        }, 
        {
            path: "/menu",
            element: <MainMenuPage />
        },
        {
            path: "/menu/:category",
            element: <MenuCategories />
        },
        {
            path: "*",
            element: <NotFound />
        }
    ]
}];

export default FrontendRoute;