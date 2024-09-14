import { createBrowserRouter, Navigate } from "react-router-dom";

import { Root } from "./root";
import { UploadDashboard } from "@/routes/UploadDashboard";
import { TypingDashboard } from "@/routes/TypingDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Navigate to="upload" replace />,
      },
      {
        path: "typing/:id?",
        element: <TypingDashboard />,
      },
      {
        path: "upload",
        element: <UploadDashboard />,
      },
    ],
  },
]);
