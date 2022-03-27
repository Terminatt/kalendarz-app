import axios, { AxiosError } from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8000/' : undefined,
    withCredentials: true,
});

axiosInstance.interceptors.response.use(undefined, (error: AxiosError) => {
    if (error.code === '401') {
        window.location.replace('/');
    }

    return Promise.reject(error);
});

export default axiosInstance;
