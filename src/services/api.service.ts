import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {logger} from './logger.service';

const baseURL: string = process.env.BACKEND_URL || 'http://localhost:3001';

const apiClient: AxiosInstance = axios.create({
    baseURL: `${baseURL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error: AxiosError) => {
        if (error.response) {
            logger.error('API Error Response:', error.response.data);
            logger.error('Status:', error.response.status);
            logger.error('Headers:', error.response.headers);
        } else if (error.request) {
            logger.error('API Error Request:', error.request);
        } else {
            logger.error('API Error Message:', error.message);
        }
        return Promise.reject(error.response ? error.response.data : error.message);
    }
);

/**
 * Performs a GET request to the backend.
 * @param pathname The specific endpoint path (e.g., '/users').
 * @param config Additional Axios request configuration.
 * @returns Promise with the backend response.
 */
const beGet = <T = unknown>(pathname: string, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.get<unknown, T>(pathname, config);
};

/**
 * Performs a POST request to the backend.
 * @param pathname The specific endpoint path.
 * @param data The data to send in the request body.
 * @param config Additional Axios request configuration.
 * @returns Promise with the backend response.
 */
const bePost = <T = unknown, D = unknown>(pathname: string, data?: D, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.post<unknown, T, D>(pathname, data, config);
};

/**
 * Performs a PUT (or PATCH) request to the backend to update resources.
 * @param pathname The specific endpoint path.
 * @param data The data to send for the update.
 * @param config Additional Axios request configuration.
 * @returns Promise with the backend response.
 */
const beUpdate = <T = unknown, D = unknown>(pathname: string, data?: D, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.put<unknown, T, D>(pathname, data, config);
};

/**
 * Performs a DELETE request to the backend.
 * @param pathname The specific endpoint path.
 * @param config Additional Axios configuration.
 * @returns Promise with the backend response.
 */
const beDel = <T = unknown>(pathname: string, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.delete<unknown, T>(pathname, config);
};

export const ApiService = {
    beGet,
    bePost,
    beUpdate,
    beDel,
};
export {beGet, bePost, beUpdate, beDel}
