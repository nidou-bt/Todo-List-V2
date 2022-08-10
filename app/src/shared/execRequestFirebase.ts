import { FirebaseError } from 'firebase/app';
import { Auth, UserCredential } from 'firebase/auth';
import { auth } from './firebase';
import { errorTypes } from './types';

interface IFetchUserApiFirebaseIn  {
  email: string;
  password: string;
  fetchUserIn: (auth: Auth, email: string, password: string) => Promise<UserCredential>;
}

interface IFetchUserApiFirebaseOut {
  fetchUserOut: (auth: Auth) => Promise<void>;
}

export async function fetchUserApiFirebaseIn({
  fetchUserIn,
  email,
  password
}: IFetchUserApiFirebaseIn) {
  try {
    const result = await fetchUserIn(auth, email!, password!);

    return result;
  } catch (err) {
    if (err instanceof FirebaseError) {
      return Promise.reject({
        type: errorTypes.ERROR_TYPE_FIREBASE,
        code: err.code,
        status: err.message,
      });
    }

    return Promise.reject({
      type: errorTypes.ERROR_TYPE_UNKNOWN,
      error: err,
    });
  }
}

export async function fetchUserApiFirebaseOut({
  fetchUserOut
}: IFetchUserApiFirebaseOut) {
  try {
    const result = await fetchUserOut(auth);
    
    return result;
  } catch (err) {
    if (err instanceof FirebaseError) {
      return Promise.reject({
        type: errorTypes.ERROR_TYPE_FIREBASE,
        code: err.code,
        status: err.message,
      });
    }

    return Promise.reject({
      type: errorTypes.ERROR_TYPE_UNKNOWN,
      error: err,
    });
  }
}