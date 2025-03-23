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
import Careers from "../Pages/Careers/Careers";
import JobDetails from "../Pages/Careers/JobDetails";
import JobForm from "../Pages/Careers/JobForm";
import Confirmation from "../Pages/Careers/Confirmation";
import AddJobs from "../Pages/Careers/PrivetRoutes/AddJobs";
import EditJobsOptions from "../Pages/Careers/PrivetRoutes/EditJobsOptions";
import EditJobForm from "../Pages/Careers/PrivetRoutes/EditJobForm";
import ManageJobApplications from "../Pages/Careers/PrivetRoutes/ManageJobApplications";
import AddTourPackage from "../Pages/TourPackages/AddTourPackages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
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
      //===============----------- SELLER Routes ----============
      {
        path: "/add-products",
        element: <AddProducts />,
      },
      {
        path: "/seller-productlist/:email",
        element: <SellerProductList />,
      },
      //===============----------- CAREER Routes ----============
      {
        path: "careers",
        element: <Careers />,
      },
      {
        path: "careers/job/:jobId",
        element: <JobDetails />,
      },
      {
        path: "careers/apply/:jobId",
        element: <JobForm />,
      },
      {
        path: "careers/confirmation",
        element: <Confirmation />,
      },
      // private routes related to career
      {
        path: "careers/add-job",
        element: <AddJobs />,
      },
      {
        path: "careers/edit-job",
        element: <EditJobsOptions />,
      },
      {
        path: "careers/edit-job/:jobId",
        element: <EditJobForm />,
      },
      {
        path: "careers/applications",
        element: <ManageJobApplications />,
      },
      // Tour Package Add
      {
        path: "addTourPackage",
        element: <AddTourPackage />,
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
