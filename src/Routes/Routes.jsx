import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import TransportationOptions from "../Pages/Transportation/TransportationOptions";

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
        element: <TransportationOptions></TransportationOptions>,
      },
    ],
  },
]);
