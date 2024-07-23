'use client'
//import { signIn, signOut } from "auth"
import { signIn, signOut } from "next-auth/react";

export function SignIn({
  provider,
  className,
  ...props
}: { provider?: string, className?: string }) {

  const handleSignIn = async () => {
    await signIn(provider || "keycloak");
  };
 
  return (
    <form
      action={handleSignIn}
    >
      <button {...props} className={className}>Sign In</button>
    </form>
  );
}

export function SignOut(props:any /*: React.ComponentPropsWithRef<typeof Button>*/) {
  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <form
      action={handleSignOut}
   
    >
      <button variant="ghost" className="w-full p-0" {...props}>
        Sign Out
      </button>
    </form>
  )
}
