'use client'
import "../../app/globals.css";
import Sidebar from "@components/sidebar/sidebar";
import Header from "@components/header/header";
import { useState } from "react";
import { QueryClientProvider } from 'react-query';
import queryClient from '@lib/queryClient';
import { Providers } from "@lib/provider/Provider";
import SessionGuard from "@lib/SessionGuard";
import { Session } from "next-auth";





export default function LayoutMain({
  children,
  session
}: Readonly<{
  children: React.ReactNode;
  session: Session | null;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
 //console.log(session)
  return (
      <Providers basePath={"/auth"} session={session} refetchInterval={4 * 60}>
        <SessionGuard>
          <QueryClientProvider client={queryClient}>
                <div className="relative flex min-h-screen w-full items-start">
                  <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                  <div className="w-full xl:pl-[300px]">
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                    <div className="bg-tg-bg p-[5px] md:p-[10px] dark:bg-dark">
                      <div className="bg-white p-[5px] md:p-[10px]  dark:bg-dark">
                        {children}
                      </div>
                    </div>
                  </div>
                </div>
            </QueryClientProvider>
        </SessionGuard>
      </Providers>
  );
}

const printTime = (i:number) => {
  const currentTime = new Date(i);
  console.log(currentTime.toLocaleString());
}