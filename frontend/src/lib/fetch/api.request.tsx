import { PaginationDto } from "@lib/pagination/pagination.dto";
import { PaginationState } from "@tanstack/react-table";
import axios from "axios";

export default class ApiRequest<T> {
    fetchPaginated = async (url:string,pagination:PaginationState) : Promise<PaginationDto<T>>=> {
        const { data } = await axios.get(url + '?page=' + pagination?.pageIndex + '&pageSize=' + pagination?.pageSize); // Endpoint de API
        return data;
      };
}