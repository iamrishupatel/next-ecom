import { Rate, Tooltip } from "artemis-ui";
import Link from "next/link";
import { useRouter } from "next/router";
import s from "./Card.module.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { removeItemFromWishList } from "../../firebase/firebaseCalls";

const ProductCard = ({ data, wishlist }) => {
  const router = useRouter();
  const user = useSelector(state => state.auth);

  const removeFromWishList = () => {
    removeItemFromWishList(user.id, data.id);
  };
  const formatINR = num => {
    return num.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  return (
    <div style={{ position: "relative" }}>
      <Link href={`/product/${data.id}`}>
        <div className={s.cardContainer}>
          <div className={s.image}>
            <img src={data.thumbnailURL} alt="" />
          </div>
          <div className={s.details}>
            <h2>{data.name}</h2>
            <Rate value={data.rating} />
            <div className={s.action}>
              <h3>{formatINR(Number(data.price))}</h3>
            </div>
          </div>
        </div>
      </Link>
      {wishlist && (
        <div className={s.wishlist} onClick={removeFromWishList}>
          <AiFillHeart color="#4945ff" />
        </div>
      )}
    </div>
  );
};

export default ProductCard;

ProductCard.defaultProps = {
  wishlist: false,
  removeFromWishList: () => {},
};
