import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";

import TourPackages from "../Pages/TourPackages/TourPackages";
import Transportation from "../Pages/Transportation/Transportation";
import ErrorPage from "../components/ErrorElements/ErrorPage";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/transportation",
        element: <Transportation></Transportation>,
      },

      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },

      {
        path: "tour-pack",
        element: <TourPackages />,
      },
    ],
  },
]);
