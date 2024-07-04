'use client';

import React from 'react';
import { Song } from '../../../types';
import MediaItem from '../Sidebar/MediaItem';
import LikeButton from './LikeButton';

export interface SearchContentProps {
  songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  if (songs.length === 0) {
    return (
      <div className='flex flex—col gap-y-2 w—full px—10 text-neutral-400'>
        No Songs Found
      </div>
    );
  }
  return (
    <div className='flex—col gap-y-2 w—full px-6'>
      {songs.map((item) => {
        return (
          <div key={item.id} className='flex items—center gap-x—4 w-full'>
            <div className='flex-1'>
              <MediaItem data={item} key={item.id} onClick={() => {}} />
            </div>
            {/* // TODO: Add Like Button */}
            <LikeButton songId={item.id} />
          </div>
        );
      })}
    </div>
  );
};

export default SearchContent;
