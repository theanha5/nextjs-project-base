import { AxiosInstance } from 'axios';
import { BaseApi } from './utils';
//

export const createAxiosService = (axiosIns: AxiosInstance, servicePath: string) =>
  new BaseApi(axiosIns, servicePath);