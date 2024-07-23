'use client'
import { useEffect, useState } from 'react';
import { RolesTablePaginated } from '@components/table/roles/roles.table.paginated';
import UserJwt from '@localTypes/user/user.jwt';
import { useSessionUserHook } from '@lib/hooks/use.session.user.hook';

const Roles = () => {
  const [altasIsOpen, setAltasIsOpen] = useState(true);
  const { user,getUserName } = useSessionUserHook();
  if (user) {

    console.log(user.family_name); // Por ejemplo, puedes acceder a user.id
  }
  
  return (
    <>
    {/*<pre>{getUserName()}</pre>
    <Collapsible open={altasIsOpen} onOpenChange={setAltasIsOpen}>
    <Card className="w-full border-[#ABB7F2]">
          <CardHeader>
            <CardTitle className="text-[#141D86]">
              Altas y bajas
              <CollapsibleTrigger asChild className="ml-3">
                <Button variant="ghost" size="sm">
                  <ArrowDownUp className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </CardTitle>
          </CardHeader>
          <CollapsibleContent>
            <CardContent>
              <>Hola</>
            </CardContent>
          </CollapsibleContent>
        </Card>
        </Collapsible>*/}
<RolesTablePaginated/>
      </>
  );
};

export default Roles;
