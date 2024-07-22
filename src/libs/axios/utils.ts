import { concatPath } from '@/libs/url';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
// utils

// override the default
declare module 'axios' {
  export interface AxiosInstance {
    request<T = any>(config: AxiosRequestConfig): Promise<T>;

    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;

    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;

    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;

    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;

    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;

    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  }
}

class BaseApi {
  constructor(
    private apiIns: AxiosInstance,
    private prefixPath: string
  ) {}

  get<T>(...params: Parameters<typeof axios.get>) {
    const [url, ...resParams] = params;
    return this.apiIns.get<T>(concatPath(this.prefixPath, url), ...resParams);
  }

  post<T>(...params: Parameters<typeof axios.post>) {
    const [url, ...resParams] = params;
    return this.apiIns.post<T>(concatPath(this.prefixPath, url), ...resParams);
  }

  put<T>(...params: Parameters<typeof axios.put>) {
    const [url, ...resParams] = params;
    return this.apiIns.put<T>(concatPath(this.prefixPath, url), ...resParams);
  }

  patch<T>(...params: Parameters<typeof axios.patch>) {
    const [url, ...resParams] = params;
    return this.apiIns.patch<T>(concatPath(this.prefixPath, url), ...resParams);
  }

  delete<T>(...params: Parameters<typeof axios.delete>) {
    const [url, ...resParams] = params;
    return this.apiIns.delete<T>(concatPath(this.prefixPath, url), ...resParams);
  }

  getApiInstance() {
    return this.apiIns;
  }
}

export type ApiResponse<T> = AxiosResponse<T>;
export { BaseApi };
