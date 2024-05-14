import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import Dashboard from "./pages/Dashboard";
import PrivateLayout from "./layouts/PrivateLayout";
import SignIn from "./pages/SignIn";
import Components from "./pages/Components";
import PageNotFound from "./pages/PageNotFound";
import AuthLayout from "./layouts/AuthLayout";
import SignUp from "./pages/SignUp";
import Users from "./pages/Users";

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
        {
          path: "users",
          element: <Users />,
        },
      ],
    },
    {
      path: "/sign-in",
      element: <AuthLayout element={<SignIn />} />,
    },
    {
      path: "/sign-up",
      element: <AuthLayout element={<SignUp />} />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemHoverBg: "#dbeafe",
          },
          Layout: {
            headerBg: "#ffffff",
          },
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;
