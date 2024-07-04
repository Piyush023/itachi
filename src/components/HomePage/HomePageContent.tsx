'use client';

import React from 'react';
import { Song } from '../../../types';
import SongItem from './SongItem';

export interface HomePageContentProps {
  songs: Song[];
}
const HomePageContent: React.FC<HomePageContentProps> = ({ songs }) => {
  if (songs.length === 0) {
    return <div className='mt-4 text-neutral-400'>No Songs Right Now</div>;
  }

  return (
    <div
      className='
        grid
        grid-cols-2
        sm:grid—cols-3
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-8
        gap-4
        mt-4
    '
    >
      {songs.map((item) => {
        return <SongItem data={item} key={item.id} onClick={() => {}} />;
      })}
    </div>
  );
};

export default HomePageContent;
