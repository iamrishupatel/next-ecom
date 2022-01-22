import { Button } from "artemis-ui";
import { useSelector } from "react-redux";
import s from "../styles/Cart.module.css";
import Link from "next/link";

import CartItem from "../components/CartItem/CartItem";

export default function CartPage(){
  const cart = useSelector(state => state.cart);
  const user = useSelector(state => state.auth);

  const getSubTotal = () => {
    const total = cart.reduce((prevVal, cartItem) => {
      let cartItemTotal = cartItem.price * cartItem.quantity;
      return prevVal + cartItemTotal;
    }, 0);
    return total;
  };

  const getTotalAfterTax = () => {
    return Number(getSubTotal()) + Number(getTax());
  };

  const getTax = () => getSubTotal() * 0.18;

  const formatINR = num => {
    return num.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };
  return (
    <main className={s.cartpage}>
      <div className={s.cart}>
        <h1>Cart</h1>
        <EmptyCart />
        <CartItems />
      </div>
      <div className={s.total}>
        <p>
          SubTotal: <span>{formatINR(getSubTotal())} </span>
        </p>
        <p>
          Tax: <span className="success-text">{formatINR(getTax())} </span>
        </p>
        <div className={s.divider} />
        <p>
          Total: <span>{formatINR(getTotalAfterTax())}</span>
        </p>

        <Button variant="primary" shape="rounded" size="sm" disabled={!user}>
          {user ? "Checkout" : "Please Sign In to checkout"}
        </Button>
      </div>
    </main>
  );
};


function EmptyCart() {
  const cartLength = useSelector(state => state.cart.length);
  return (
    cartLength === 0 && (
      <div className={s.emptyCart}>
        <img src="/empty.svg" alt="" />
        <p>There's nothing in your cart</p>
        <Link href="/shop">
          <Button shape="rounded" size="sm" variant="primary">
            Go to shop
          </Button>
        </Link>
      </div>
    )
  );
}

function CartItems({}) {
  const products = useSelector(state => state.cart);
  return products.map((prod, index) => <CartItem key={index} product={prod} />);
}
