//export { auth as middleware } from "auth"
import {auth,signIn} from "auth"

import { NextResponse } from "next/server";
import { decod } from "@lib/utils";
import UserJwt from "./types/user/user.jwt";
//import { useSession, signIn, signOut } from "next-auth/react";
// Or like this if you need to do something here.
 export default auth((req) => {
   //console.log("req.auth" , req.auth) //  { session: { user: { ... } } }
   const url = req.nextUrl.clone();
  //console.log(url.pathname)
   if (url.pathname.startsWith('/web-public')) {
     return NextResponse.next(); // Skip the middleware for /web-public
   }
   /*console.log("ADMIN1",decod(req.auth?.accessToken)?.realm_access?.roles)
   console.log("ADMIN2",decod(req.auth?.accessToken))
   console.log("ADMIN3",decod(req.auth?.accessToken)?.sub)*/
   //console.log("ADMIN4",(req.auth?.user as UserJwt)?.sub)
   if (!req.auth?.accessToken) {
    url.pathname = '/web-public';
    return NextResponse.redirect(url);
   }
  // const session = useSession();
  // console.log("session.data",session.data)
 })

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|web-public|svg|auth|jpg).*)"]
}


