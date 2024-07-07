import Header from '@/app/components/Header/Header';
import PlaylistItem from '@/app/components/PlaylistCard/PlaylistItem';
import React from 'react';
import { getSongs } from '../../actions/getSongs';
import HomePageContent from '@/app/components/HomePage/HomePageContent';

export const revalidate = 0;

const Home = async () => {
  const PlaylistItemData = {
    name: 'Liked Songs',
    href: '/liked',
    image: '/images/liked.png',
  };

  const songs = await getSongs();

  return (
    <div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
      <Header>
        <div className='mb-2'>
          <h1 className='text-white text-3xl font-semibold'>Welcome Back</h1>
          <div className='grid gird-cols-1 sm:gird-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4'>
            <PlaylistItem PlaylistItemProps={PlaylistItemData} />
          </div>
        </div>
      </Header>
      <div className='mt-2 mb-7 px-6'>
        <div className='flex justify-between items-center'>
          <h1 className='text-white text-2xl font-semibold'>Newest Songs</h1>
        </div>
      </div>
      <div className='mt-2 mb-7 px-6'>
        <div className='flex justify-between items-center'>
          <HomePageContent songs={songs} />
        </div>
      </div>
    </div>
  );
};

export default Home;
