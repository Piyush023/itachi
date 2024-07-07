'use client';

import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { Price, ProductsWithPrices } from '../../../../types';
import Button from '../Header/Button';
import { useUser } from '../../../../hooks/useUser';
import toast from 'react-hot-toast';
import { postData } from '../../../../libs/helpers';
import { getStripe } from '../../../../libs/stripeClient';
import useSubscriptionModal from '../../../../hooks/useSubscriptionModal';

interface SubscribeModalProps {
  products: ProductsWithPrices[];
}

export const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100);

  return priceString;
};

const SubscribeModal: React.FC<SubscribeModalProps> = ({ products }) => {
  const subscribeModal = useSubscriptionModal();
  const { user, isLoading, subscription } = useUser();

  const onChange = (open: boolean) => {
    if (!open) {
      subscribeModal.onClose();
    }
  };

  const [isPriceLoading, setIsPriceLoading] = useState<string>();

  const handleCheckout = async (price: Price) => {
    setIsPriceLoading(price.id);
    if (!user) {
      setIsPriceLoading(undefined);
      return toast.error('Must be logged In');
    }

    if (subscription) {
      setIsPriceLoading(undefined);
      return toast('Already Subscribed');
    }
    try {
      const { sessionId } = await postData({
        url: '/api/create-checkout-session',
        data: { price },
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.log(error, 'Error');
      toast.error((error as Error).message);
    } finally {
      setIsPriceLoading(undefined);
    }
  };

  let content = <div className='text-center'>No products available.</div>;

  if (products.length) {
    content = (
      <div>
        {products.map((item) => {
          if (!item.prices?.length) {
            return <div key={item.id}>No Prices Available</div>;
          }
          return item.prices.map((price) => {
            return (
              <Button
                key={price.id}
                onClick={() => handleCheckout(price)}
                disabled={isLoading || price.id === isPriceLoading}
                className='mb-4'
              >{`Subscribe for ${formatPrice(price)} a ${
                price.interval
              }`}</Button>
            );
          });
        })}
      </div>
    );
  }

  if (subscription) {
    content = <div className='text-center'>Already subscribed</div>;
  }

  return (
    <Modal
      title='Only for Premium User'
      description='Listen to Music with Itachi Preimum'
      isOpen={subscribeModal.isOpen}
      onChange={onChange}
    >
      {content}
    </Modal>
  );
};

export default SubscribeModal;
