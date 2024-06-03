import { ButtonType } from '../../../types';
import Button from '../../Button/Button';
import './Checkout.css';

type CheckoutProps = {
  sum: number;
};

const Checkout = ({ sum }: CheckoutProps) => {
  const vat = sum * 0.2;
  const total = sum + vat;

  return (
    <div className="checkout">
      <div className="checkout-sum">
        <span>Sum total</span>
        <span>$ {+sum.toFixed(2)}</span>
      </div>
      <div className="checkout-vat">
        <span>Vat</span>
        <span>$ {+vat.toFixed(2)}</span>
      </div>
      <div className="checkout-total">
        <h1>total</h1>
        <span>$ {+total.toFixed(2)}</span>
      </div>
      <Button type={ButtonType.BUTTON} text="check out" />
    </div>
  );
};

export default Checkout;
