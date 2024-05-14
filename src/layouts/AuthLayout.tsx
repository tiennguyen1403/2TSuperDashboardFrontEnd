import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
  element: any;
};

const AuthLayout: React.FC<Props> = (props) => {
  const { element } = props;
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) return <Navigate to="/" replace />;

  return <div>{element}</div>;
};

export default AuthLayout;
