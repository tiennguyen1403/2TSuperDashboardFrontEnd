import { Navigate, Outlet } from "react-router-dom";

const PrivateLayout = () => {
  const localStorageToken = localStorage.getItem("token");

  if (localStorageToken) return <Navigate to="/login" replace />;

  return (
    <div>
      <p>Private Layout</p>
      <Outlet />
    </div>
  );
};

export default PrivateLayout;
