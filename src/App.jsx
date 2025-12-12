
import React, { useState } from 'react'
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router'
import { RootLayout } from './layout/RootLayout'
import { Home } from './pages/Home'
import { Settings } from './pages/Settings'
import { RouteContext } from './contexts/routeContext'

export const App = () => {
  const [currentRoute,setCurrentRoute] = useState(0)
  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<RootLayout/>}>
          <Route index element={<Home/>}/>
          <Route path='settings' element={<Settings/>}/>
        </Route>
    )
  )
  return (
    <RouteContext value={[currentRoute, setCurrentRoute]}>
      <RouterProvider router={router}/>
    </RouteContext>
  )
}
