import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Song } from '../types';
import { cookies } from 'next/headers';

export const getSongs = async (): Promise<Song[]> => {
  const supabaseClient = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabaseClient
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error);
  }
  return (data as any) || [];
};
