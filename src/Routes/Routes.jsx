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
import ByBus from "../Pages/Transportation/ByBus/ByBus";
import ByAir from "../Pages/Transportation/ByAir/ByAir";
import SeatPlan from "../Pages/Transportation/ByBus/SeatPlan";
import PassengerDetails from "../Pages/Transportation/ByBus/PassengerDetails";
import Terms from "../Pages/Terms/Terms";
import ByCar from "../Pages/Transportation/ByCar/ByCar";
import CarDetails from "../Pages/Transportation/ByCar/CarDetails";
import Privacy from "../Pages/Privacy/Privacy";
import Contact from "../Pages/Contact/Contact";
import BecomeASeller from "../Pages/SellerActivities/BecomeAseller/BecomeASeller";
import BookingConfirmation from "../Pages/Transportation/ByBus/BookingConfirmation";
import BusPayments from "../Pages/Transportation/ByBus/BusPayments/BusPayments";
import PaymentErrorHandler from "../Pages/Transportation/ByBus/Components/PaymentErrorHandler";
import CarReservation from "../Pages/Transportation/ByCar/CarReservation";

import DashboardWelcome from "../Pages/Dashboard/DashboardWelcome";

import MyCart from "../Pages/Eshop/MyCart/MyCart";
import MakeSeller from "../Pages/Dashboard/ModeratorDashboard/makeSeller";
import Payment from "../Pages/Payment/Payment";
import FAQ from "../Pages/FAQ/FAQ";
import CookiePolicy from "../Pages/CookiePolicy/CookiePolicy";
import HelpCenter from "../Pages/HelpCenter/HelpCenter";
import BookingPolicy from "../Pages/BookingPolicy/BookingPolicy";

import MyProfile from "../Pages/Profile/MyProfile";
import UpdateProfile from "../Pages/Profile/UpdateProfile";
import ProductDetails from "../Pages/Eshop/ProductDetails/ProductDetails";


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
        path: "/my-profile/:email",
        element: <MyProfile></MyProfile>

      },
      {
        path: "/update-profile",
        element: <UpdateProfile></UpdateProfile>

      },
      {
        path: "/careers",
        element: <Careers />,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/terms",
        element: <Terms></Terms>,
      },
      {
        path: "/privacy",
        element: <Privacy></Privacy>,
      },
      {
        path: "/transportation",
        element: <Transportation />,
        children: [
          {
            path: "by-road",
            element: <ByBus />,
          },
          {
            path: "seat-plan/:busId",
            element: <SeatPlan />,
          },
          {
            path: "by-car",
            element: <ByCar />,
          },
          {
            path: "car-details/:carId",
            element: <CarDetails />,
          },
          {
            path: "car-reservation/:carId",
            element: <CarReservation />,
          },
          {
            path: "by-air",
            element: <ByAir />,
          },
          {
            path: "passenger-details",
            element: <PassengerDetails />,
          },
          {
            path: "booking-confirmation",
            element: <BookingConfirmation />,
          },
        ],
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
        path: "becomeseller",
        element: <BecomeASeller />,
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
        path: "/eshop",

        element: <EshopHome></EshopHome>,
      },
      {
        path:"/product/:id",
        element:<ProductDetails/>
      },
      {
        path: "/payment",

        element: <Payment></Payment>,
      },
      {
        path: "myCart",
        element: <MyCart></MyCart>,
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
      {
        path: "transportation/payment",
        element: <BusPayments />,
      },
      {
        path: "transportation/payment-error",
        element: <PaymentErrorHandler />,
      },
      // New routes for missing pages
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/cookie-policy",
        element: <CookiePolicy />,
      },
      {
        path: "/help-center",
        element: <HelpCenter />,
      },
      {
        path: "/booking-policy",
        element: <BookingPolicy />,
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
      {
        path: "makeSeller",
        element: <MakeSeller />,
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
