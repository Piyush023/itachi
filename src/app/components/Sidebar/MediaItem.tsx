'use client';

import React from 'react';
import { Song } from '../../../../types';
import useLoadImage from '../../../../hooks/useLoadImage';
import Image from 'next/image';
import usePlayer from '../../../../hooks/usePlayer';

export interface MediaItemProps {
  data: Song;
  onClick: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
  const imageUrl = useLoadImage(data);
  const player = usePlayer();

  const handleOnClick = () => {
    if (onClick) {
      return onClick(data.id);
    }
    return player.setId(data.id);
  };
  return (
    <div
      className='flex items-center gap—x-3 cursor-pointer hover:bg-neutral-800/50 w—full p-2 rounded-md'
      onClick={handleOnClick}
    >
      <div className='relative rounded-md min—h-[48px] min-w-[48px] overflow-hidden'>
        <Image
          src={
            'https://assets.gamesoye.com/NATIVE_APP/images/bowlee/players/1/IND-Jasprit-Bumrah.png' ||
            '/images/liked.png'
          }
          alt='mediaItemImage'
          className='object-cover'
          width={50}
          height={50}
          style={{ position: 'relative', height: '100%', width: '100%' }}
        />
      </div>
      <div className='flex—col gap-y-1 overflow-hidden pl-4'>
        <p className='text-white truncate'>{data.title}</p>
        <p className='text-neutral-400 text-sm truncate'>{data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
