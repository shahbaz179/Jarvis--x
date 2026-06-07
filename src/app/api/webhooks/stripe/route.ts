import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://placeholder.com',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder'
);

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET || 'placeholder');
  } catch (err: unknown) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const plan = session.metadata?.plan;
      const billingCycle = session.metadata?.billingCycle;

      if (userId && plan) {
        await supabaseAdmin.from('subscriptions').upsert({
          user_id: userId,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string || null,
          plan,
          billing_cycle: billingCycle,
          status: 'active',
          current_period_start: new Date().toISOString(),
          current_period_end: billingCycle === 'lifetime' 
            ? null 
            : new Date(Date.now() + (billingCycle === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString(),
        }, { onConflict: 'user_id' });

        // Generate license key
        const licenseKey = `JRVX-${generateKey()}-${generateKey()}-${generateKey()}`;
        await supabaseAdmin.from('licenses').upsert({
          user_id: userId,
          license_key: licenseKey,
          plan,
          is_active: true,
          activated_at: new Date().toISOString(),
          expires_at: billingCycle === 'lifetime' ? null : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        }, { onConflict: 'user_id' });
      }
      break;
    }

    case 'customer.subscription.updated': {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const subscription = event.data.object as any;
      await supabaseAdmin.from('subscriptions').update({
        status: subscription.status === 'active' ? 'active' : subscription.status,
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      }).eq('stripe_subscription_id', subscription.id);
      break;
    }

    case 'customer.subscription.deleted': {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const subscription = event.data.object as any;
      await supabaseAdmin.from('subscriptions').update({
        status: 'canceled',
        plan: 'free',
      }).eq('stripe_subscription_id', subscription.id);
      break;
    }
  }

  return NextResponse.json({ received: true });
}

function generateKey(): string {
  return Math.random().toString(36).substring(2, 6).toUpperCase();
}
