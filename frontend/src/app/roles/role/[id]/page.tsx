'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const dynamicParams = false;



export default function PhotoPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const route = useRouter();
  useEffect(() => {
    route.push("/roles");
  })
  return <>Redirigiendo</>;
}
