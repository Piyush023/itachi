import React from 'react';
import { FaPlay } from 'react-icons/fa';

function PlayButton() {
  return (
    <button className='transition opacity-0 rounded-full bg-green-400 flex items-center p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110'>
      <FaPlay className='text-black' />
    </button>
  );
}

export default PlayButton;
