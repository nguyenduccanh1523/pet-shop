import React from "react";
import Login from "../views/auth/login";
import Register from "../views/auth/register";

// import SignIn from "../views/dashboard/auth/sign-in";
// import SignUp from "../views/dashboard/auth/sign-up";
// import ResetPassword from "../views/dashboard/auth/resetPassword";

// // errors
// import Error404 from "../views/dashboard/errors/error404";
// import Error500 from "../views/dashboard/errors/error500";
// import ForgotPassword from "../views/dashboard/auth/forgot-password";
// import Recoverpw from "../views/dashboard/auth/confirm-mail";

//extrpages



export const SimpleRouter = [


  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
//   {
//     path: "/forgot-password",
//     element: <ForgotPassword />
//   },
//   {
//     path: "/confirm-mail",
//     element: <Recoverpw />
//   },
//   {
//     path: "/reset-password",
//     element: <ResetPassword />
//   },
//   {
//     path: "*",
//     element: <Error404 />,
//   },
//   {
//     path: "*",
//     element: <Error500 />,
//   },
  
//   {
//     path: "extra-pages/pages-comingsoon",
//     element: <ComingSoon />,
//   },
];
