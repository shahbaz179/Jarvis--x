import Stripe from 'stripe';

// Using a placeholder secret key if not set to prevent build errors during initialization
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';

export const stripe = new Stripe(stripeKey, { 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiVersion: '2024-12-18.acacia' as any 
});

export const PLANS = {
  pro: {
    monthly: process.env.STRIPE_PRICE_PRO_MONTHLY || 'price_placeholder',
    yearly: process.env.STRIPE_PRICE_PRO_YEARLY || 'price_placeholder',
  },
  ultimate: {
    monthly: process.env.STRIPE_PRICE_ULTIMATE_MONTHLY || 'price_placeholder',
    yearly: process.env.STRIPE_PRICE_ULTIMATE_YEARLY || 'price_placeholder',
    lifetime: process.env.STRIPE_PRICE_ULTIMATE_LIFETIME || 'price_placeholder',
  },
};
