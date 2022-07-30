import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { errorTypes } from './types';
// Set default `baseURL`
// axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

export async function execRequest<T>(axiosRequestConfig: AxiosRequestConfig<T>): Promise <T | void> {
  try {
    const { data }: AxiosResponse<T> = await axios({
      ...axiosRequestConfig,
    });

    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { response, request } = error;
      if (response) {
        // Request was made and the server responded with
        // a status code that falls out of the range of 2xx
        return Promise.reject({
          type: errorTypes.ERROR_TYPE_SERVER,
          status: response.status,
          message: response.statusText
        });
      }

      if (request) {
        // Request was made but no response was received, `error.request`
        // is an instance of XMLHttpRequest in the browser and an instance
        // of http.ClientRequest in Node.js
        return Promise.reject({
          type: errorTypes.ERROR_TYPE_REQUEST,
          status: request.status,
          message: request.statusText
        });
      }

      // Something happened while setting up the request
      // and triggered an Error
      return Promise.reject({
        type: errorTypes.ERROR_TYPE_CLIENT,
        message: error
      });

    } else {
      return Promise.reject({
        type: errorTypes.ERROR_TYPE_UNKNOWN,
        error: error,
      });
    }
  }
}
