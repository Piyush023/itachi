import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface SidebarItemProps {
  icon: any;
  label: string;
  active: boolean;
  href: string;
}
const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `
        flex
        flex-row
        h-auto
        items-center
        w-full
        gap-x-4
        text-md
        font-medium
        cursor-pointer
        hover: text-white
        transition
        text-neutral-500
        py-1
        `,
        active && 'text-white'
      )}
    >
      <Icon size={26} />
      {label}
    </Link>
  );
};

export default SidebarItem;
