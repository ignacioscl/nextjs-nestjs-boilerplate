'use client'
//import { signIn, signOut } from "auth"
import { signIn, useSession } from "next-auth/react";

export function SignIn({
  provider,
  className,
  ...props
}: { provider?: string, className?: string }) {

  const handleSignIn = async () => {
    console.log("handleSignIn");
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
  return (
    <form
      action={async () => {
        //await signOut()
      }}
      className="w-full"
    >
      <button variant="ghost" className="w-full p-0" {...props}>
        Sign Out
      </button>
    </form>
  )
}
