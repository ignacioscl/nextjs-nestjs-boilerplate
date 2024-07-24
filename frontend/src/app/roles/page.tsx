'use client'
import { useEffect, useState } from 'react';
import { RolesTablePaginated } from '@components/table/roles/roles.table.paginated';
import { useSessionUserHook } from '@lib/hooks/use.session.user.hook';

const Roles = () => {
  const [altasIsOpen, setAltasIsOpen] = useState(true);
  const { user,getUserName } = useSessionUserHook();
  if (user) {

    console.log(user.family_name); // Por ejemplo, puedes acceder a user.id
  }
  
  return (
    <>
      <RolesTablePaginated/>
    </>
  );
};

export default Roles;
