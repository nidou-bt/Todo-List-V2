import { useContext } from "react";
import Button from "../components/UI/Button";
import { UserContext } from "../context/user-context/UserContext";

function Today(): JSX.Element {
  const { logout } = useContext(UserContext);
  return(
    <div>
      today
      <Button type="button" onClick={logout}>Logout </Button>
    </div>
  );
}

export default Today;
