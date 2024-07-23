import axios from 'axios';
import qs from 'qs';
import { PaginationDto } from "@lib/pagination/pagination.dto";
import { PaginationState } from "@tanstack/react-table";
import urlFetch, { UrlEnum } from '@lib/url.fetch/url.fetch';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

interface UseApiRequest<T, Q> {
  getAll: (pagination?: PaginationState, query?: Q) => Promise<PaginationDto<T>>;
  getCustom: (path:string,pagination?: PaginationState, query?: Q) => Promise<PaginationDto<T>>;
  getOne: (id: number) => Promise<T>;
  create: (payload: T) => Promise<T>;
  update: (id: number, payload: T) => Promise<void>;
  updateCustom: (queryString: Q, payload: T) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
  deleteCustom: (queryString: Q) => Promise<void>;
  error: any;
  errorDetail: ApiError | undefined;
  pagination: PaginationState;
  setPagination: (a:any) => void
}

interface ApiError {
  message: string;
  status: number;
  validationErrors: string | []
}
export function useApiRequest<T, Q>(urlEnum: UrlEnum): UseApiRequest<T, Q> {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const { getUrl } = urlFetch(urlEnum);
  const [error,setError] = useState();
  const [errorDetail,setErrorDetail] = useState<ApiError>();
  const url = getUrl();

  const getAll = async (pagination?: PaginationState, query?: Q): Promise<PaginationDto<T>> => {
    let queryParams = {
      page: pagination?.pageIndex,
      pageSize: pagination?.pageSize,
      ...query
    };
    if (hasQueryChanged(query)) {
      setPagination({ pageIndex: 0, pageSize: 10 });
      queryParams = {
         page: 0, pageSize: 10 ,
        ...query
      };
    }
    

    const queryString = qs.stringify(queryParams, { addQueryPrefix: true });
    try {
      const { data } = await axios.get(`${url}${queryString}`);
      return data;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await signIn("keycloak"); // Redirige al usuario a la página de inicio de sesión
      }
      setError(error); // Lanza el error para que el llamador pueda manejarlo si es necesario
      setErrorDetail({message: error?.response?.data?.message, status: error?.response?.status, validationErrors: error?.response?.data?.validationErrors})
      return {data: [],...pagination,total:0} as any
    }
  };
  const getCustom = async (path:string,pagination?: PaginationState, query?: Q): Promise<PaginationDto<T>> => {
    const queryParams = {
      page: pagination?.pageIndex,
      pageSize: pagination?.pageSize,
      ...query
    };

    const queryString = qs.stringify(queryParams, { addQueryPrefix: true });
    const { data } = await axios.get(`${url}${path}${queryString}`);
    return data;
  };
  const getOne = async (id: number): Promise<T> => {
    const { data } = await axios.get(`${url}/${id}`);
    return data;
  };

  const create = async (payload: T): Promise<T> => {
    const { data } = await axios.post(`${url}`, payload);
    return data;
  };

  const update = async (id: number, payload: T): Promise<void> => {
    await axios.put(`${url}/${id}`, payload);
  };

  const updateCustom = async (queryString: Q, payload: T): Promise<void> => {
    const queryStringFormatted = qs.stringify(queryString, { addQueryPrefix: true });
    await axios.put(`${url}${queryStringFormatted}`, payload);
  };

  const deleteItem = async (id: number): Promise<void> => {
    await axios.delete(`${url}/${id}`);
  };

  const deleteCustom = async (queryString: Q): Promise<void> => {
    const queryStringFormatted = qs.stringify(queryString, { addQueryPrefix: true });
    await axios.delete(`${url}${queryStringFormatted}`);
  };

  return { getAll, getOne, create, update, updateCustom, deleteItem, deleteCustom ,getCustom,error,errorDetail,setPagination,pagination};
}

let previousQuery: any;

export function hasQueryChanged(currentQuery: any): boolean {
  const isChanged = JSON.stringify(currentQuery) !== JSON.stringify(previousQuery);
  previousQuery = currentQuery;
  return isChanged;
}