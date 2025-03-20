import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import TourPackages from "../Pages/TourPackages/TourPackages";
import Transportation from "../Pages/Transportation/Transportation";
import ErrorPage from "../components/ErrorElements/ErrorPage";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import TourDetails from "../Pages/TourDetails/TourDetails";
import TourBooking from "../Pages/TourBooking/TourBooking";
import AddProducts from "../Pages/SellerActivities/AddProducts";
import SellerProductList from "../Pages/SellerActivities/SellerProductList";

import About from "../Pages/About/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
   // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/transportation",
        element: <Transportation />,
      },
      {
        path: "/tour-pack",
        element: <TourPackages />,
      },
      {
        path: "/tour-details/:title",
        element: <TourDetails />,
      },
      {
        path: "tour-booking",
        element: <TourBooking />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
