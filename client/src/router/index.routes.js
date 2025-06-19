import React from "react";

//layoutpages
import Default from "../layouts/default";
import { DefaultRouter } from "./default-router.routes";
import ProtectedRoute from "./protected-router.routes";
import Maintenance from "../views/errors/maintain";
// import AdminRoutes from "../routes/admin.routes";

const isMaintaince = process.env.REACT_APP_MAINTAINCE === "true";

export const IndexRouters = [
  {
    path: "/",
    element: isMaintaince ? <Maintenance /> : (
      <ProtectedRoute>
        <Default />
      </ProtectedRoute>
    ),
    children: [
      ...DefaultRouter,
      ...(isMaintaince ? [] : [{ path: "/pages-maintenance", element: <Maintenance /> }]),
    ],
  },
//   {
//     path: "/admin/*",
//     element: <AdminRoutes />
//   },
  ...(isMaintaince ? [{ path: "*", element: <Maintenance /> }] : []),
];
