import axios, { AxiosError } from 'axios';
import { TServerError } from './types';
import { AppApiError } from './error-handler';

const appApiIns = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setSession = (accessToken: string | null) => {
  if (accessToken) {
    appApiIns.defaults.headers.Authorization = `Bearer ${accessToken}`;
    return;
  }

  delete appApiIns.defaults.headers.Authorization;
};

appApiIns.interceptors.response.use(
  (response) => {
    if (response.data instanceof Blob) return response;
    return response.data;
  },
  (error: AxiosError<TServerError>) => {
    if (error.response?.status === 403) {
      window.location.replace('/error/403');
      return;
    }

    if (error.response?.status === 401) {
      // logout();
      /* eslint consistent-return: off */
      return;
    }

    if (error.response?.data) {
      return Promise.reject(
        new AppApiError({
          ...error.response?.data,
          name: 'COMMON_ERROR',
          status: error.response.status,
        })
      );
    }

    return Promise.reject(error);
  }
);

// appApiIns.interceptors.request.use((config) => {

//   return config;
// });

// const setAppApiErrorHandler = (errorHandler: (error: AxiosError<unknown>) => void) => {
//   return appApiIns.interceptors.response.use((r) => r, errorHandler);
// };

export { appApiIns };
