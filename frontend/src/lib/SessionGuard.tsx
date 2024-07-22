"use client";
import { signIn, useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";

export default function SessionGuard({ children }: { children: ReactNode }) {
  const { data } = useSession();
  useEffect(() => {
    if (data?.error === "RefreshAccessTokenError") {
      signIn("keycloak");
    }



    // Verificar la expiración del token de sesión
    if (data?.expires) {
      const expirationTime = new Date(data.expires).getTime();
      const currentTime = new Date().getTime();
      /*console.log("currentTime , expirationTime",currentTime , data.expiresAt)
      printTime(currentTime);
      printTime(data.expiresAt as number);*/
      

      if (currentTime > (data.expiresAt as number)) {
        // El token ha expirado, toma medidas (por ejemplo, renovar el token)
        console.log("La sesión ha expirado, renovando token...");
        signIn("keycloak"); // Forzar inicio de sesión para intentar resolver el error
      }
    }
    /*if (!data) {
      signIn("keycloak");
    }*/
  }, [data]);

  return <>{children}</>;
}

const printTime = (i:number) => {
  const currentTime = new Date(i);
  console.log(currentTime.toLocaleString());
}