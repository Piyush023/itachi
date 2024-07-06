'use client';

import React from 'react';
import usePlayer from '../../../../hooks/usePlayer';
import useGetSongById from '../../../../actions/useGetSongById';
import useLoadSongUrl from '../../../../hooks/useLoadSongUrl';
import PlayerContent from './PlayerContent';
import { Song } from '../../../../types';

const Player = () => {
  const player = usePlayer();

  const { song } = useGetSongById(player?.activeId);

  const songUrl = useLoadSongUrl(song!);

  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div className='fixed bottom-0 bg-black w-full pb-10 h-[80px] px-5'>
      <PlayerContent song={song as Song} songUrl={songUrl} key={songUrl} />
    </div>
  );
};

export default Player;
