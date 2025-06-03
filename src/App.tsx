import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home";
import { Details } from "./pages/details";
import { Profile } from "./pages/profile";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { Edit } from "./pages/profile/edit";

import { Layout } from "./components/layout";

import { Private } from "./routes/private";

export const router = createBrowserRouter([
  {
    element:<Layout/>,
    children:[
      {
        path:'/',
        element:<Private><Home/></Private>
      },
      {
        path:'/details/:mal_id',
        element:<Private><Details/></Private>
      },
      {
        path:'/profile',
        element:<Private><Profile/></Private>
      },
      {
        path:'/profile/edit',
        element:<Private><Edit/></Private>
      }
    ]
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:'/login',
    element:<Login/>
  }
])

