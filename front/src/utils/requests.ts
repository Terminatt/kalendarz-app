import axios from '@axios/axios';
import { PageNumber } from '@generics/generics';
import { AxiosResponse } from 'axios';

export function getList<R>(url: string, page: PageNumber): Promise<AxiosResponse<R, any>> {
    return axios.get(`${url}${page ? `?page=${page}` : ''}`);
}
