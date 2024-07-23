import { PaginationDto } from "@lib/pagination/pagination.dto";
import { PaginationState } from "@tanstack/react-table";
import axios from "axios";
import { deprecate } from "util";

/**
 * @deprecated
 */
export default class ApiRequest<T,Q> {
    getAll = async (url:string,pagination?:PaginationState,query?:Q) : Promise<PaginationDto<T>>=> {
        const { data } = await axios.get(url + '?page=' + pagination?.pageIndex + '&pageSize=' + pagination?.pageSize); // Endpoint de API
        return data;
      };
    getById = async (url:string,id:number) : Promise<T> => {
      return await axios.get(url + '/' + id); // Endpoint de API
    }
}