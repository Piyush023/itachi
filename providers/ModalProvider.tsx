'use client';

import AuthModal from '@/app/components/Modal/AuthModal';
import UploadModal from '@/app/components/Modal/UploadModal';
import SubscribeModal from '@/app/components/Subscribe/SubscribeModal';
import { useEffect, useState } from 'react';
import { ProductsWithPrices } from '../types';

interface ModalProviderProps {
  products: ProductsWithPrices[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({ products }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModal />
      <SubscribeModal products={products} />
    </>
  );
};

export default ModalProvider;
