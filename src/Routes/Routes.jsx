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
import VisaAssistance from "../Pages/VisaAssistance/VisaAssistance";
import VisaStatus from "../Pages/VisaAssistance/VisaStatus";
import EshopHome from "../Pages/Eshop/EshopHome/EshopHome";
import DashboardLayout from "../Layout/DashboardLayout";
import DashboardCharts from "../Pages/Dashboard/AdminDashboard/DashboardCharts";
import BecomeASeller from "../Pages/SellerActivities/BecomeAseller/BecomeASeller";
import DashboardWelcome from "../Pages/Dashboard/DashboardWelcome";

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
        path: "/seller-productlist/:email",
        element: <SellerProductList />,
      },
      {
        path: "/becomeseller",
        element: <BecomeASeller></BecomeASeller>,
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
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/transportation",
        element: <Transportation></Transportation>,
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
      {
        path: "careers",
        element: <Careers />,
      },
      {
        path: "eshop",
        element: <EshopHome></EshopHome>,
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
      // VISA Routes
      {
        path: "/visa-assistance",
        element: <VisaAssistance />,
      },
      {
        path: "/visa-status",
        element: <VisaStatus />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardWelcome />,
      },
      {
        path: "add-products",
        element: <AddProducts />,
      },
      {
        path: "addTourPackage",
        element: <AddTourPackage />,
      },
      {
        path: "adminDashboard",
        element: <DashboardCharts />,
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
