import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { ProductsWithPrices } from '../types';
import { cookies } from 'next/headers';

export const getActiveProductsWithPrices = async (): Promise<
  ProductsWithPrices[]
> => {
  const supabaseClient = createServerComponentClient({ cookies });

  const { data, error } = await supabaseClient
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .order('metadata->index')
    .order('unit_amount', { foreignTable: 'prices' });

  if (error) {
    console.log(error);
    return [];
  }
  return data || [];
};
