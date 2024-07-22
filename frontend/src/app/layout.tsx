import type { GetStaticProps, Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DarkModeToggle from "@components/sidebar/dark.mode.toggle";
import LayoutMain from "@components/layout/layout.main";
import Head from "next/head";
import { auth } from "../../auth";
import { Session } from "next-auth";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "nextjs-nestjs-boilerplate",
  description: "This boilerplate integrates Nest.js, Next.js, Swagger, TypeORM, Class Validator, and Tailwind CSS to streamline modern web app development. It offers modular architecture, type safety, automatic API documentation, seamless database integration, and responsive design. Ideal for building scalable, efficient web applications quickly.",
  //line 5 to 8 is only addition to make in layout.js
  icons: {
    icon: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session : Session | null = await auth()
  //console.log(session?.user)
  /*if (session?.user) {
    console.log(session.user)
    // TODO: Look into https://react.dev/reference/react/experimental_taintObjectReference
    // filter out sensitive data before passing to client.
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    }
  }*/
  return (
    <html lang="en">

      <body className={inter.className}>
        <LayoutMain session={session}>
          {children}
        </LayoutMain>
        <DarkModeToggle />
        
      </body>
    </html>
  );
}

