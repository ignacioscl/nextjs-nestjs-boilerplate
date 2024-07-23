import NextAuth from "next-auth"
import "next-auth/jwt"

import Keycloak from "next-auth/providers/keycloak"

import type { NextAuthConfig } from "next-auth"
import { JWT } from "next-auth/jwt"
import UserJwt from "./src/types/user/user.jwt" 
import { decod, decodeToken } from "./src/lib/utils"
import axios, { AxiosError } from "axios"

const config = {
  theme: { logo: "https://authjs.dev/img/logo-sm.png" },
  
  providers: [
    
    Keycloak({
      name:'keycloak',
      clientId: process.env.AUTH_KEYCLOAK_ID,
      clientSecret: process.env.AUTH_KEYCLOAK_SECRET,
      issuer: process.env.AUTH_KEYCLOAK_ISSUER,
    }),
   
  ],
  basePath: "/auth",
  pages: {
    error: '/error', // Custom error page
  },
  callbacks: {
    
    async signIn({ user, account, profile, email, credentials }) {
      //console.log("user",user, "account",account,"profile", profile, email,"credentials", credentials);
      return true
    },

    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },
    async jwt({ token, trigger, session, account,profile }) {
      //console.log("tokennn2",token, "trigger",trigger, "session",session, "account",account,"profile",profile )

      //console.log("access_token:" , decod(account?.access_token))
      //console.log("id_token:" , decod(account?.id_token))
      if (trigger === "update") token.name = session.user.name
      /*if (account?.provider === "keycloak") {
        return { ...token, accessToken: account.access_token,roles:(profile?.realm_access as any)?.roles }
      }*/
      if (account) {
        token.idToken       = account.id_token
        token.accessToken   = account.access_token
        token.refreshToken  = account.refresh_token
        //token.expiresAt     = account.expires_at
        
        const now = new Date();
        const exp = expireInMilliseconds(account.expires_at || 0);
        token.expiresAt     = exp
        //token.user          = { ...token }

        //token.roles         = (profile?.realm_access as any)?.roles
        return token
      }
      
      if (Date.now() < (((token.expiresAt as number) ! * 1000 - 60 * 1000))) {
        return token
      } else {
        try {
          const response = await requestRefreshOfAccessToken(token)

          const tokens : JWT = await response.json()

          if (!response.ok) throw tokens

          const updatedToken: JWT = {
            ...token, // Keep the previous token properties
            idToken: tokens.id_token,
            accessToken: tokens.access_token as string || '',
            expiresAt: Math.floor(Date.now() / 1000 + (tokens.expires_in as number)),
            refreshToken: tokens.refresh_token ?? token.refreshToken,
          }
          return updatedToken
        } catch (error) {
          console.error("Error refreshing access token", error)
          return { ...token, error: "RefreshAccessTokenError" }
        }
      }
    },
    async session({ session, token }) {
      //console.log("session.session",session,"session.token",token)
      if (token?.accessToken) {
        session.accessToken = token.accessToken as any
        session.expiresAt = token.expiresAt as any
        session.idToken = token.idToken as any
        session.refreshToken = token.refreshToken as any
        session.user  = decodeToken(token.accessToken) as UserJwt;
        //session.roles = token.roles as string[];  // Add roles to the session
      }
      return session
    },
  },
  experimental: {
    enableWebAuthn: true,
  },
  events: {
      signOut: ({ session, token } : any) => doFinalSignoutHandshake(token)
  },
  debug: false//process.env.NODE_ENV !== "production",
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
/*
declare module "next-auth" {
  interface Session {
    accessToken?: string
    error?: string
    expiresAt?: number
    refreshToken?: string
    //roles?: string[] ;
    user?: any
  }
}*/

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}

async function doFinalSignoutHandshake(jwt: JWT) {
  const { provider, idToken } = jwt;
console.log(jwt)
  //if (provider == keycloak.id) {
      try {
          // Add the id_token_hint to the query string
          const params = new URLSearchParams();
          params.append('id_token_hint', idToken as string);
          const { status, statusText } = await axios.get(`${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/logout?${params.toString()}`);

          // The response body should contain a confirmation that the user has been logged out
          console.log("Completed post-logout handshake", status, statusText);
      }
      catch (e: any) {
          console.error("Unable to perform post-logout handshake", (e as AxiosError)?.code || e)
      }
//}
}

async function  requestRefreshOfAccessToken(token: JWT) {
  // Asegúrate de que las variables de entorno no sean undefined
  const clientId = process.env.AUTH_KEYCLOAK_ID!;
  const clientSecret = process.env.AUTH_KEYCLOAK_SECRET!;
  const keycloakIssuer = process.env.KEYCLOAK_ISSUER!;
  
  if (!clientId || !clientSecret || !keycloakIssuer) {
    throw new Error("Missing environment variables for Keycloak configuration.");
  }
  
  const refreshToken = token.refreshToken as string;
  if (!refreshToken) {
    throw new Error("Missing refresh token.");
  }
  
  return await fetch(`${keycloakIssuer}/protocol/openid-connect/token`, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }).toString(),
    method: "POST",
    cache: "no-store"
  });
}

const expireInMilliseconds = (i: number) => { 
  const expiresAtSeconds = i;
const expiresAtMillis = expiresAtSeconds * 1000; // Convertir a milisegundos

return expiresAtMillis;
}