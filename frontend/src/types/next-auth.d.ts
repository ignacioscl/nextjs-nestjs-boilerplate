// types/next-auth.d.ts

import { Session } from "next-auth";
import { Userjwt } from "./userjwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string
    error?: string
    expiresAt?: number
    refreshToken?: string
    //roles?: string[] ;
    user?: any
  }
}
