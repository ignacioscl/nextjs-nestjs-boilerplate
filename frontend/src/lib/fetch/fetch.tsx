import { PaginationState } from "@tanstack/react-table";
import axios from "axios";

export const fetchPaginated = async (url:string,pagination?:PaginationState) => {
    const { data } = await axios.get('/api/roles?page=' + pagination?.pageIndex + '&pageSize=' + pagination?.pageSize); // Endpoint de API
    return data;
  };