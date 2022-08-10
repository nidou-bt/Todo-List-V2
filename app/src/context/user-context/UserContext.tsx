import { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { auth } from 'shared/firebase';
import { fetchUserApiFirebaseIn, fetchUserApiFirebaseOut } from 'shared/execRequestFirebase';
import { TUser } from 'shared/types';

interface IUserContext {
  currentUser: User;
  register: (user: TUser) => Promise<void>;
  login: (user: TUser) => Promise<void>;
  logout: () => Promise<void>;
  isLoggedIn: boolean;
}

interface IUserContextProvider {
  children: React.ReactNode;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

export function UserContextProvider({ children }: IUserContextProvider) {
  const [currentUser, setCurrentUser] = useState<User>({} as User);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setIsLoggedIn(true);
        console.log('user', user);
      } else {
        setIsLoggedIn(false);
      }
      setIsLoadingData(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const register = async ({
    email,
    password,
    firstName,
    lastName,
  }: TUser): Promise<void> => {
    if (email&&password) {
      await fetchUserApiFirebaseIn({
        fetchUserIn: createUserWithEmailAndPassword,
        email,
        password,
      });
    }

    // register api for the full data of user
    return;
  };

  const login = async ({ email, password }: TUser): Promise<void> => {
    await fetchUserApiFirebaseIn({
      fetchUserIn: signInWithEmailAndPassword,
      email,
      password,
    }).catch((err: any) => console.log({ err }));
    return;
  };

  const logout = async (): Promise<void> => {
    await fetchUserApiFirebaseOut({
      fetchUserOut: signOut,
    });
    return;
  };

  return (
    <UserContext.Provider
      value={{ currentUser, register, login, logout, isLoggedIn }}
    >
      {!isLoadingData && children}
    </UserContext.Provider>
  );
}
