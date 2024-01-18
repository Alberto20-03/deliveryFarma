import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './checkoutform';

// const clavePrivadaStripe = process.env.REACT_APP_STRIPE_SECRET_KEY;
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_live_51OIxE3CUDH19YYPAnM57acq2H338XqB2WZGB86UOnRg9wiKnTkglVWxxMCEEWP6151LHDwAHuOz1cwVf10nE5v7m00gPFqEBct'
);

export function PagoStripe({ setVerPagos, total, cart }) {
  return (
    <div className="form">
      <Elements stripe={stripePromise}>
        <CheckoutForm setVerPagos={setVerPagos} total={total} cart={cart} />
      </Elements>
    </div>
  );
}
