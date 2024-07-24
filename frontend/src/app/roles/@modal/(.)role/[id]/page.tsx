'use client'
import RoleDialog from "@components/dialog/roles/role.dialog";
import { useEffect, useState } from "react";


export default function PhotoModal({
  params: { id: roleId },
}: {
  params: { id: number };
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {

      setOpen(true)

    
    
  },[roleId])
  return <><RoleDialog id={roleId} open={open} setOpen={setOpen}/></>;
}