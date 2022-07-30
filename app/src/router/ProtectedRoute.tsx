import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { UserContext } from "../context/user-context/UserContext";

function ProtectedRoute() {
  const { isLoggedIn } = useContext(UserContext);

  return(
    isLoggedIn ? (
      <Outlet />
    ) : 
      <Navigate to={"/sign-in"} replace={true} />
  );
}

export default ProtectedRoute;
