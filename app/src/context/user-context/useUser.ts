import { useContext } from 'react';
import { TUser } from 'shared/types';
import { UserContext } from './UserContext';

function useUser() {
  const { currentUser, register, login, logout, isLoggedIn } =
    useContext(UserContext);

  const onLogin = (user: TUser) => {
    return login(user);
  };

  const onRegister = (user: Required<TUser>) => {
    return register(user);
  };

  const onLogout = () => {
    return logout();
  };

  return {
    onLogin,
    onRegister,
    onLogout,
    currentUser,
    isLoggedIn,
  };
}

export default useUser;
