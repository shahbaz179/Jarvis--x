import { NextResponse } from 'next/server';
import { stripe, PLANS } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { plan, billingCycle } = await request.json();
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const planPrices = PLANS[plan as keyof typeof PLANS];
    if (!planPrices) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }
    
    const priceId = planPrices[billingCycle as keyof typeof planPrices];
    if (!priceId) {
      return NextResponse.json({ error: 'Invalid billing cycle' }, { status: 400 });
    }

    const isLifetime = billingCycle === 'lifetime';

    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: isLifetime ? 'payment' : 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?checkout=canceled`,
      metadata: { userId: user.id, plan, billingCycle },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error('Checkout error:', error);
    const msg = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
