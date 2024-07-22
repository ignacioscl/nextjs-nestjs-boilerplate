
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import UserJwt from '../types/user/user.jwt';
import { jwtDecode } from "jwt-decode";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const decod = (str?: string) => {
  if (!str) return null;
  const decodedToken = JSON.parse(Buffer.from(str.split('.')[1], 'base64').toString('utf-8'));
  return decodedToken;
}

export const decodeToken = (token: string): UserJwt  =>{
  return jwtDecode<UserJwt>(token);
}