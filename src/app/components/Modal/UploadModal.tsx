'use client';

import {
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import Modal from './Modal';
import { useEffect, useState } from 'react';
import useUploadModal from '../../../../hooks/useUploadModal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../Form/Input';
import Button from '../Header/Button';
import toast from 'react-hot-toast';
import { useUser } from '../../../../hooks/useUser';
import uniqid from 'uniqid';

const UploadModal = () => {
  const router = useRouter();
  const { user } = useUser();
  const { session } = useSessionContext();
  const supabaseClient = useSupabaseClient();

  const { onClose, isOpen } = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const songFile = values?.song?.[0];

      const imageFile = values?.image?.[0];

      if (!user && !imageFile && !songFile) {
        toast.error('Missing Fields');
        return;
      }
      // Creating a Unique Id for the DB - supabase.
      const unique_id = uniqid();

      // Upload Songs
      const { data: songData, error: songError } = await supabaseClient.storage
        .from('songs')
        .upload(`song-${values?.title}-${unique_id}`, songFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error('Failed Song Upload');
      }

      //Upload Image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from('images')
          .upload(`images-${values?.title}-${unique_id}`, imageFile, {
            cacheControl: '3600',
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error('Failed Image Upload');
      }

      const { error: supabaseError } = await supabaseClient
        .from('songs')
        .insert({
          user_id: user && user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });
      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }
      router.refresh();
      setIsLoading(false);
      toast.success('Song Uploaded Successfully');
      reset();
      onClose();
    } catch (error) {
      toast.error('SomeThing Went Wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (open: boolean) => {
    if (!open) {
      // Reset the Content
      reset();
      onClose();
    }
  };

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  return (
    <Modal
      title='Add a Song'
      description='Upload a mp3 file'
      isOpen={isOpen}
      onChange={onChange}
    >
      <form
        action=''
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-y-4'
      >
        <Input
          id={'Title'}
          disabled={isLoading}
          // This will spread the props of the Input - onChange, onBlur, onCapture
          {...register('title', { required: true })}
          placeholder={'Song Title'}
        />
        <Input
          id={'Author'}
          disabled={isLoading}
          // This will spread the props of the Input - onChange, onBlur, onCapture
          {...register('author', { required: true })}
          placeholder={'Song Author'}
        />
        <div>
          <div>Select a Song file</div>
          <Input
            id={'song'}
            type={'file'}
            disabled={isLoading}
            // This will spread the props of the Input - onChange, onBlur, onCapture
            {...register('song', { required: true })}
            accept={'.mp3'}
          />
        </div>
        <div>
          <div>Select a Song Image</div>
          <Input
            id={'image'}
            type={'file'}
            disabled={isLoading}
            // This will spread the props of the Input - onChange, onBlur, onCapture
            {...register('image', { required: true })}
            accept={'image/*'}
          />
        </div>
        <Button disabled={isLoading} type={'submit'}>
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
