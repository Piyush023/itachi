'use client';

import React, { useEffect } from 'react';
import { Song } from '../../../../types';
import { useRouter } from 'next/navigation';
import { useUser } from '../../../../hooks/useUser';
import MediaItem from '../Sidebar/MediaItem';
import LikeButton from '../Search/LikeButton';
import useOnPlay from '../../../../hooks/useOnPlay';

export interface LikedContentProps {
  songs: any[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const router = useRouter();

  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [user, isLoading, router]);

  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div className='flex flex—col gap-y-10 w—full px-5 text-neutral-400'>
        No Liked Songs
      </div>
    );
  }
  return (
    <div className='flex flex-col gap-y—-2 w-full p-6'>
      {songs.map((item) => {
        return (
          <div key={item.id} className='flex items—center gap—x-4 w-full'>
            <div className='flex-1'>
              <MediaItem
                onClick={(id: string) => {
                  onPlay(id);
                }}
                data={item.songs}
              />
            </div>
            <LikeButton songId={item.id} />
          </div>
        );
      })}
    </div>
  );
};

export default LikedContent;
