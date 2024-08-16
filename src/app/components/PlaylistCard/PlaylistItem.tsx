'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaPlay } from 'react-icons/fa';

export interface PlaylistItemProps {
  name: string;
  image: string;
  href: string;
}
const PlaylistItem: React.FC<{ PlaylistItemProps: PlaylistItemProps }> = ({
  PlaylistItemProps,
}) => {
  const router = useRouter();
  const onClick = () => {
    //Add auth check here
    router.push(PlaylistItemProps.href);
  };
  return (
    <button
      onClick={onClick}
      className='relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4'
    >
      <div className='relative min-h-[64px] min-w-[64px]'>
        <Image
          src={
            'https://assets.gamesoye.com/NATIVE_APP/images/bowlee/players/1/IND-Jasprit-Bumrah.png'
          }
          fill
          alt='Image'
          className='object-cover'
        />
      </div>
      <p className='font-medium truncate py-5'>{PlaylistItemProps.name}</p>
      <div className='absolute transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-3 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110'>
        <FaPlay className='text-black' />
      </div>
    </button>
  );
};

export default PlaylistItem;
