import { Button, QuantityPicker, Rate } from "artemis-ui";
import { useDispatch } from "react-redux";
import s from "./CartItem.module.css";
import { AiOutlineDelete } from "react-icons/ai";
import {
  decreaseItem,
  increaseItem,
  removeFromBasket,
} from "../../features/cartSlice";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();

  const increaseQuantity = () => {
    dispatch(increaseItem(product.id));
  };
  const decreaseQuantity = () => {
    if (product.quantity === 1) return;
    dispatch(decreaseItem(product.id));
  };

  const handleRemove = () => {
    dispatch(removeFromBasket(product.id));
  };
  const formatINR = price => {
    return price.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };
  return (
    <div className={s.cartItem}>
      <div className={s.img}>
        <img src={product.thumbnailURL} alt="" />
      </div>
      <div className={s.desc}>
        <h3 className={s.title}>{product.name}</h3>
        <div className={s.price}>{formatINR(Number(product.price))}</div>
        <div className={s.details}>
          <p>
            <strong>By:</strong> {product.brand.toUpperCase()}
          </p>
          <p>
            <strong>Color:</strong> {product.color.label}
          </p>
          <p>
            <strong>Size:</strong> {product.size.label}
          </p>
          <Rate value={product.rating} />
        </div>
        <div className={s.actions}>
          <QuantityPicker
            max={10}
            count={product.quantity}
            shape="rounded"
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
          />
          <Button
            size="sm"
            shape="rounded"
            variant="danger-light"
            onClick={handleRemove}
          >
            <AiOutlineDelete />
            <span>Remove</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CartItem;
