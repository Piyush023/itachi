'use client';

import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';
import Box from './Box';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import SidebarItem from './SidebarItem';
import Library from './Library';

export interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathName = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: 'Home',
        active: pathName !== '/search',
        href: '/',
      },
      {
        icon: BiSearch,
        label: 'Search',
        active: pathName === '/search',
        href: '/search',
      },
    ],
    [pathName]
  );

  return (
    <div className='flex h-full'>
      <div className='hidden md:flex bg-black flex-col gap-y-2 h-full p-2 w-[300px]'>
        <Box>
          <div className='flex flex-col gap-y-4 px-5 py-4'>
            {routes.map((item) => {
              return <SidebarItem key={item.label} {...item} />;
            })}
          </div>
        </Box>
        <Box className='overflow-y-auto h-full'>
          <Library />
        </Box>
      </div>
      <main className='h-full flex-1 overflow-y-auto py-2'>{children}</main>
    </div>
  );
};

export default Sidebar;