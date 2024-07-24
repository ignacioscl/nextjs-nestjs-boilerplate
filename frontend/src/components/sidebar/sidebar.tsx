import { useSessionUserHook } from '@lib/hooks/use.session.user.hook';
import Link from 'next/link';
import PropTypes from "prop-types";
import { useState } from "react";
import RolesEnum from '../../enums/roles.enum';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@lib/utils';

const navList = [
  {
    link: "/",
    text: "Home",
    roles: [RolesEnum.ADMIN]
  },
  {
    divider: true,
  },
  {
    link: "/roles",
    text: "Roles",
    roles: [RolesEnum.ADMIN]
  },
  {
    link: "#",
    text: "Products",
    children: [
      {
        link: "#",
        text: "Dropdown One",
      },
      {
        link: "#",
        text: "Dropdown Two",
      },
      {
        link: "#",
        text: "Dropdown Three",
      },
    ],
  },/*
  {
    link: "/",
    text: "Messages",
  },
  {
    link: "/",
    text: "Order",
  },
  {
    link: "/",
    text: "Calender",
  },
  {
    link: "/",
    text: "Static",
  },
  {
    link: "/",
    text: "Documents",
  },
  {
    divider: true,
  },
  {
    link: "/",
    text: "Chat",
  },
  {
    link: "/",
    text: "Settings",
  },
  {
    link: "/",
    text: "Log out",
  },*/
];

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
    const pathname = usePathname()
    const [openDropDown, setOpenDropDown] = useState<boolean>(false);
    const {user,isLogued} = useSessionUserHook();

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDropDownToggle = () => {
    setOpenDropDown(!openDropDown);
  };
  if (!isLogued()) {
    return <></>
  }
  return (
    <>
      <div
        className={`fixed left-0 top-0 z-40 flex h-screen w-full max-w-[300px] flex-col justify-between overflow-y-auto bg-white shadow-card duration-200 dark:bg-dark-2 xl:translate-x-0 ${sidebarOpen ? "-translate-x-full" : "translate-x-0"}`}
      >
        <div>
          <div className="px-12 pb-9 pt-5">
            <Link href="/">
            <img
              src="/images/logo/logo.svg"
              alt="Descripción de la imagen"
              width="100%"
            />
              <img src='/images/logo/logo-white.svg' alt="logo" className="hidden dark:block" />
            </Link>
          </div>

          <nav>
            <ul>
              {navList.filter(t => {
                const userRoles = user.realm_access.roles;
                const requiredRoles = t.roles;
                //console.log(requiredRoles,userRoles);
                const hasSome = requiredRoles?.some(role => userRoles.includes(role));
                
                if (hasSome) {
                  return true;
                }
                return false;
              }).map((item, index) =>
                item?.divider ? (
                  <li key={index}>
                    <div className="mx-9 my-5 h-px bg-stroke dark:bg-dark-3"></div>
                  </li>
                ) : item?.children ? (
                  <li key={index} className="relative">
                    <Link
                      href={item.link}
                      onClick={handleDropDownToggle}
                      className={`
                          relative flex items-center border-r-4 py-[10px] pl-9 pr-10 text-base font-medium text-body-color duration-200 hover:border-primary hover:bg-primary/5 dark:text-dark-6
                          ${openDropDown === true ? "border-primary bg-primary/5" : "border-transparent"}
                        `}
                    >
                      {item.text}
                      <span
                        className={`absolute right-10 top-1/2 -translate-y-1/2 ${
                          openDropDown ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="fill-current"
                        >
                          <path d="M10 14.25C9.8125 14.25 9.65625 14.1875 9.5 14.0625L2.3125 7C2.03125 6.71875 2.03125 6.28125 2.3125 6C2.59375 5.71875 3.03125 5.71875 3.3125 6L10 12.5312L16.6875 5.9375C16.9688 5.65625 17.4062 5.65625 17.6875 5.9375C17.9688 6.21875 17.9688 6.65625 17.6875 6.9375L10.5 14C10.3437 14.1562 10.1875 14.25 10 14.25Z" />
                        </svg>
                      </span>
                    </Link>

                    {openDropDown && (
                      <div>
                        <ul className="py-[6px] pl-[50px] pr-10">
                          {item?.children.map((child, childIndex) => (
                            <li key={childIndex}>
                              <Link
                                href={child.link}
                                className="flex items-center border-r-4 border-transparent py-[9px] text-base font-medium text-body-color duration-200 hover:text-primary dark:text-dark-6 dark:hover:text-primary"
                              >
                                {child.text}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ) : (
                  <li key={index}>
                    <Link
                      href={item.link as any}
                      className={cn(
                        'relative flex items-center border-r-4 py-[10px] pl-9 pr-10 text-base font-medium text-body-color duration-200 hover:border-primary hover:bg-primary/5 dark:text-dark-6',
                        {
                          'border-primary bg-primary/5': (pathname === item.link),
                          'border-transparent': !(pathname === item.link),
                        }
                      )}
                    >
                      {item.text}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
        </div>

        <div className="p-10">
          <div className="flex items-center">
            <div className="mr-4 h-[50px] w-full max-w-[50px] rounded-full">
              <img
                src='/images/avatar/image-02.jpg'
                alt="profile"
                className="h-full w-full rounded-full object-cover object-center"
              />
            </div>
            <div>
              <h6 className="text-base font-medium text-dark dark:text-white">
                Musharof
              </h6>
              <p className="text-sm text-body-color dark:text-dark-6">
                hello@tailgrids.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={handleSidebarToggle}
        className={`fixed left-0 top-0 z-30 h-screen w-full bg-dark bg-opacity-80 xl:hidden ${sidebarOpen ? "-translate-x-full" : "translate-x-0"}`}
      ></div>
    </>
  );
};

Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
};

export default Sidebar;
