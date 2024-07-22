// hooks/useMyOwnSessionUser.ts

import { useSession } from "next-auth/react";
import  Userjwt  from "@localTypes/user/user.jwt";

export const useSessionUserHook = () => {
  const { data: session } = useSession();

  // Asegurarse de que el usuario esté presente y sea del tipo correcto
  const user: Userjwt | undefined = session?.user as Userjwt;

  // Función para obtener el nombre de usuario
  const getUserName = (): string | undefined => {
    return user?.name;
  };
  const getGivenName = (): string | undefined => {
    return user?.given_name;
  };
  const getFamilyName = (): string | undefined => {
    return user?.family_name;
  };
  // Función para obtener el correo electrónico del usuario
  const getEmail = (): string | undefined => {
    return user?.email;
  };

  // Función para obtener la miniatura del usuario (ajusta según tu estructura)
  const getThumbnail = (): string | undefined => {
    // Aquí puedes ajustar según cómo esté estructurado tu objeto Userjwt
    // Por ejemplo, si tienes una propiedad 'thumbnail' o 'avatar'
    // return user?.thumbnail || user?.avatar;
    return user ? `/path/to/thumbnails/${user.sub}.jpg` : undefined;
  };

  const isLogued = (): boolean => {
    return !!user;
  }
  return { user, getUserName, getEmail, getThumbnail,getGivenName,getFamilyName,isLogued };
};
