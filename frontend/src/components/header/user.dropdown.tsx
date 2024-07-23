'use client'
import Link from 'next/link';
import { SignIn, SignOut } from '../auth-components';
import { useSessionUserHook } from '@lib/hooks/use.session.user.hook';


const navList = [
  {
    link: "/perfil/miperfil",
    text: "Mi Perfil",
  },
];

const UserDropdown = () => {
  const { isLogued } = useSessionUserHook();
  return (
    <div className="group relative">
      <Link href="#" className="flex items-center">
        <div className="h-12 w-full max-w-[48px] cursor-pointer rounded-full">
          <img
            src='/images/avatar/image-01.jpg'
            alt="avatar"
            className="h-full w-full rounded-full object-cover object-center"
          />
        </div>
      </Link>

      <div className="invisible absolute right-0 top-[120%] z-50 mt-3 w-[200px] space-y-2 rounded bg-white p-3 opacity-0 shadow-card-2 duration-200 group-hover:visible group-hover:top-full group-hover:opacity-100 dark:bg-dark-2">
        {navList.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="block rounded px-4 py-2 text-sm font-medium text-body-color hover:bg-gray-2 hover:text-primary dark:text-dark-6 dark:hover:bg-dark"
          >
            {item.text}
          </Link>
        ))}
        {!isLogued() && <SignIn provider="keycloak" className="w-full text-left block rounded px-4 py-2 text-sm font-medium text-body-color hover:bg-gray-2 hover:text-primary dark:text-dark-6 dark:hover:bg-dark"/>}
        {isLogued() && <SignOut provider="keycloak" className="w-full text-left block rounded px-4 py-2 text-sm font-medium text-body-color hover:bg-gray-2 hover:text-primary dark:text-dark-6 dark:hover:bg-dark"/>}
      </div>
    </div>
  );
};

export default UserDropdown;
