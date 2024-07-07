import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getUrl } from '../../../../libs/helpers';
import { createOrRetrieveCustomer } from '../../../../libs/supabaseAdmin';
import { stripe } from '../../../../libs/stripe';

export async function POST() {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('Could not Get User');
    }

    const customer = await createOrRetrieveCustomer({
      uuid: user?.id || '',
      email: user?.email || '',
    });

    if (!customer) {
      throw new Error('Could not Get Customer');
    }

    const { url } = await stripe.billingPortal.sessions.create({
      customer,
      return_url: `${getUrl()}/account`,
    });

    return NextResponse.json({ url });
  } catch (error: any) {
    console.log('Error', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
