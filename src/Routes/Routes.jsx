import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
<<<<<<< HEAD
import Transportation from "../Pages/Transportation/Transportation";

=======

import TransportationOptions from "../Pages/Transportation/TransportationOptions";
import Login from "../Pages/Authentication/Login";



>>>>>>> a31d2e9ba3908c65f521a351e9e6c47d1e9a9d45
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/transportation",
<<<<<<< HEAD
        element: <Transportation></Transportation>,
=======
        element: <TransportationOptions></TransportationOptions>,
        },
        {
        path: "login",
        element: <Login />,
>>>>>>> a31d2e9ba3908c65f521a351e9e6c47d1e9a9d45
      },
    ],
  },
]);
<<<<<<< HEAD
=======


>>>>>>> a31d2e9ba3908c65f521a351e9e6c47d1e9a9d45
