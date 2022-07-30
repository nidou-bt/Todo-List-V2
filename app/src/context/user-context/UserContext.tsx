import { createContext, useEffect, useState } from "react";
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  User,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../../shared/firebase";
import { errorTypes, TUser } from "../../shared/types";

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

interface IFetchUserApiFirebase extends TUser {
  fetchUser: (
    auth: Auth,
    email: string,
    password: string
  ) => Promise<UserCredential>;
}

const fetchUserApiFirebase = async ({
  fetchUser,
  email,
  password,
}: IFetchUserApiFirebase): Promise<UserCredential | void> => {
  try {
    const result = await fetchUser(auth, email, password);
    return result;
  } catch (err) {
    if (err instanceof FirebaseError) {
      return Promise.reject({
        type: errorTypes.ERROR_TYPE_FIREBASE,
        code: err.code,
        status: err.cause,
      });
    }
    return Promise.reject({
      type: errorTypes.ERROR_TYPE_UNKNOWN,
      error: err,
    });
  }
};

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
        console.log("user", user);
      } else {
        setIsLoggedIn(false);
      }
      setIsLoadingData(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const register = async ({
    email,
    password,
    firstName,
    lastName
  }: TUser): Promise<void> => {
    await fetchUserApiFirebase({
      fetchUser: createUserWithEmailAndPassword,
      email,
      password,
    });
    // register api for the full data of user
    console.log("user", firstName, lastName);
    return;
  };

  const login = async ({ email, password }: TUser): Promise<void> => {
    await fetchUserApiFirebase({
      fetchUser: signInWithEmailAndPassword,
      email,
      password,
    });
    return;
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      return;
    } catch (err) {
      if (err instanceof FirebaseError) {
        return Promise.reject({
          type: errorTypes.ERROR_TYPE_FIREBASE,
          code: err.code,
          status: err.cause,
        });
      }
      return Promise.reject({
        type: errorTypes.ERROR_TYPE_UNKNOWN,
        error: err,
      });
    }
  };

  return (
    <UserContext.Provider
      value={{ currentUser, register, login, logout, isLoggedIn }}
    >
      {!isLoadingData && children}
    </UserContext.Provider>
  );
}
