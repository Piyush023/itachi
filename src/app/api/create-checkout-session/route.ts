import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createOrRetrieveCustomer } from '../../../../libs/supabaseAdmin';
import { stripe } from '../../../../libs/stripe';
import { getUrl } from '../../../../libs/helpers';

export async function POST(request: Request) {
  try {
    const { price, quantity = 1, metadata = {} } = await request.json();

    if (!price || !price.id) {
      throw new Error('Price ID is required');
    }

    const supabase = createRouteHandlerClient({
      cookies: cookies,
    });

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      throw new Error(`Error retrieving user: ${userError.message}`);
    }

    if (!user) {
      throw new Error('User not authenticated');
    }

    const customer = await createOrRetrieveCustomer({
      uuid: user.id || '',
      email: user.email || '',
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer,
      line_items: [
        {
          price: price.id,
          quantity,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      subscription_data: {
        metadata,
      },
      success_url: `${getUrl()}/account`,
      cancel_url: `${getUrl()}`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    console.error(error, 'Error in Checkout Route');
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
