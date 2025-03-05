import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { LoadingProvider } from './Contexts/LoadingContext';
import router from './AppRoutes/MainAppRoutes'

const App = () => {
  return (
    <LoadingProvider>
<RouterProvider router={router}/>
    </LoadingProvider>
    
  )
}

export default App


