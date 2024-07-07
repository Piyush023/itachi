'use client';

import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { TbPlaylist } from 'react-icons/tb';
import useAuthModal from '../../../../hooks/useAuthModal';
import useUploadModal from '../../../../hooks/useUploadModal';
import { Song } from '../../../../types';
import MediaItem from './MediaItem';
import useOnPlay from '../../../../hooks/useOnPlay';
import useSubscriptionModal from '../../../../hooks/useSubscriptionModal';
import { useUser } from '../../../../hooks/useUser';

export interface LibraryProps {
  songs: Song[];
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
  const { user, subscription } = useUser();
  const subscribeModal = useSubscriptionModal();

  const autModal = useAuthModal();

  const uploadModal = useUploadModal();

  const onPlay = useOnPlay(songs);

  const onClick = () => {
    if (!user) {
      autModal.onOpen();
    } else {
      // Check for Subscription
      if (!subscription) {
        return subscribeModal.onOpen();
      }
      uploadModal.onOpen();
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between px-5 pt-4'>
        <div className='inline-flex items-center gap-x-2'>
          <TbPlaylist className='text-neutral-400' size={26} />
          <p className='text-neutral-400 font-medium text-md'>Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={
            // Starting OnClick
            onClick
          }
          size={20}
          className='text-neutral-400 cursor-pointer hover: text-white transition'
        />
      </div>
      <div className='flex flex-col gap-y-2 mt-4 px-3'>
        {songs.map((item) => {
          return (
            <MediaItem
              data={item}
              key={item.id}
              onClick={(id: string) => onPlay(id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Library;
