export type TUser = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export enum errorTypes {
  ERROR_TYPE_SERVER = 'ERROR_TYPE_SERVER',
  ERROR_TYPE_CLIENT = 'ERROR_TYPE_CLIENT',
  ERROR_TYPE_REQUEST = 'ERROR_TYPE_REQUEST',
  ERROR_TYPE_UNKNOWN = 'ERROR_TYPE_UNKNOWN',
  ERROR_TYPE_FIREBASE = 'ERROR_TYPE_FIREBASE',
}
