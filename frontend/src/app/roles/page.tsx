'use client'
import { useEffect, useState } from 'react';
import { RolesTablePaginated } from '@components/table/roles/roles.table.paginated';
import { useSessionUserHook } from '@lib/hooks/use.session.user.hook';
import { Button } from '@components/ui/button';
import { useRouter } from 'next/navigation';

const Roles = () => {
  const router = useRouter()
  const { user,getUserName } = useSessionUserHook();
  if (user) {

    //console.log(user.family_name); // Por ejemplo, puedes acceder a user.id
  }
  
  return (
    <>
      <Button variant="default" onClick={() => router.push('roles/role/-1')}>Roles</Button>
      <RolesTablePaginated/>
    </>
  );
};

export default Roles;
