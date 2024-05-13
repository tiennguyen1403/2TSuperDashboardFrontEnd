import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PrivateLayout from "./layouts/PrivateLayout";
import Login from "./pages/Login";
import Components from "./pages/Components";
import PageNotFound from "./pages/PageNotFound";

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "components",
          element: <Components />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
