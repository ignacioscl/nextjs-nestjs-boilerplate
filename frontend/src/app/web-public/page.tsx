'use client'
import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const { data: session, update } = useSession()
  const router = useRouter();
  useEffect(() => {

    if (!session?.user) {
      signIn('keycloak'); // Redirect to Keycloak login
    } else {
      router.push("/")
    }
    
  }, []);

  return <p>Redireccionando al login...</p>;
};

export default SignIn;
