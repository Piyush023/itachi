'use client';

import { useSessionContext } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useAuthModal from '../../../../hooks/useAuthModal';
import { useUser } from '../../../../hooks/useUser';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import toast from 'react-hot-toast';

export interface LikeButtonProps {
  songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
  const router = useRouter();

  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from('liked_songs')
        .select('*')
        .eq('user_id', user?.id)
        .eq('song_id', songId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };

    fetchData();
  }, [user?.id, songId, supabaseClient]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }
    if (isLiked) {
      const { error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('user_id', user?.id)
        .eq('song_id', songId);

      if (error) {
        return toast.error(error.message);
      } else {
        setIsLiked(false);
      }
    } else {
      const { error } = await supabaseClient.from('liked_songs').insert({
        song_id: songId,
        user_id: user?.id,
      });

      if (error) {
        console.log('Error in Else', error);
        return toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success('Song Liked!');
      }
    }
    router.refresh();
  };

  return (
    <button onClick={handleLike} className='hover:opacity-75transition'>
      <Icon color={isLiked ? '#22c55e' : 'white'} size={20} />
    </button>
  );
};

export default LikeButton;
