import axios from 'axios';
import qs from 'qs';
import { PaginationDto } from "@lib/pagination/pagination.dto";
import { PaginationState } from "@tanstack/react-table";
import urlFetch, { UrlEnum } from '@lib/url.fetch/url.fetch';

interface UseApiRequest<T, Q> {
  getAll: (pagination?: PaginationState, query?: Q) => Promise<PaginationDto<T>>;
  getOne: (id: number) => Promise<T>;
  create: (payload: T) => Promise<T>;
  update: (id: number, payload: T) => Promise<void>;
  updateCustom: (queryString: Q, payload: T) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
  deleteCustom: (queryString: Q) => Promise<void>;
}

export function useApiRequest<T, Q>(urlEnum: UrlEnum): UseApiRequest<T, Q> {
  const { getUrl } = urlFetch(urlEnum);
  const url = getUrl();

  const getAll = async (pagination?: PaginationState, query?: Q): Promise<PaginationDto<T>> => {
    const queryParams = {
      page: pagination?.pageIndex,
      pageSize: pagination?.pageSize,
      ...query
    };

    const queryString = qs.stringify(queryParams, { addQueryPrefix: true });
    const { data } = await axios.get(`${url}${queryString}`);
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

  return { getAll, getOne, create, update, updateCustom, deleteItem, deleteCustom };
}
