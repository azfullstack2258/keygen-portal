import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError, AxiosHeaders } from 'axios';
import { extractErrorMessage } from './errorHandler';

const BASE_URL = 'https://api.keygen.sh/v1/accounts/demo';

class APIClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers = config.headers || new AxiosHeaders();
          (config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`);
        }
        (config.headers as AxiosHeaders).set('Accept', 'application/json');
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
          // Handle unauthorized error, e.g., redirect to login
          window.location.href = '/login';
        }
        return Promise.reject(new Error(extractErrorMessage(error)));
      }
    );
  }

  public get<T>(url: string, config?: InternalAxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  public post<T>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  public put<T>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  public delete<T>(url: string, config?: InternalAxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }
}

const apiClient = new APIClient(BASE_URL);

export default apiClient;
