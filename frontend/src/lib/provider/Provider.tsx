'use client'

import { SessionProvider, SessionProviderProps, signIn, useSession } from "next-auth/react"
import { ReactNode, useEffect } from "react"

interface ProvidersProps extends SessionProviderProps {
  children: ReactNode;
}

export function Providers({ children, ...props }: ProvidersProps) {
  
  return (
    <SessionProvider {...props}>
      {children}
    </SessionProvider>
  )
}
