import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import FrontendRoute from './FrontendRoutes';
import AdminRoute from './AdminRoutes';
import AuthRoute from './AuthRoutes';

const router = createBrowserRouter([
    ...FrontendRoute,
    ...AdminRoute,
    ...AuthRoute
]);

export default router;