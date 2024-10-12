import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import SignUp from './components/SignUp/SignUp.tsx'
import SignIn from './components/SignIn/SignIn.tsx'
import Dashboard from './components/Dashboard/Dashboard.tsx'
import Home from './components/Home/Home.tsx'
import Error from './components/Error/Error.tsx'
import Show from './components/Show/Show.tsx'
import Add from './components/Add/Add.tsx'
import Edit from './components/Edit/Edit.tsx'

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/",
    element: <SignIn />
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "show/:id",
        element: <Show />
      },
      {
        path: "add",
        element: <Add />
      },
      {
        path: "edit/:id",
        element: <Edit />
      },
      {
        path: "favorites",
        //here should be favorites page
      },
      {
        path: "orders",
         //here should be order list page
      }
    ],
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider
    router={router}
  />
  </StrictMode>,
)
