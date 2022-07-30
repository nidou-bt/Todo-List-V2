import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { UserContext } from "../context/user-context/UserContext";

function PublicRoute() {
  const { isLoggedIn } = useContext(UserContext);

  return !isLoggedIn ? <Outlet /> : <Navigate to={"/"} replace={true} />;
}

export default PublicRoute;
