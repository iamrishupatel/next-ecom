import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/Products/ProductCard";
import Loader from "../components/Loader";
import { getProductById } from "../firebase/firebaseCalls";
import Link from "next/link";

import { doc, onSnapshot } from "firebase/firestore";

// styles
import s from "../styles/Wishlist.module.css";
import { db } from "../firebase";

const WishlistPage = () => {
  const user = useSelector(state => state.auth);

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    if (!user) return () => {};
    setLoading(true);
    const userRef = doc(db, "users", user.id);

    const unsub = onSnapshot(userRef, doc => {
      const { wishlist } = doc.data();
      console.log("data", wishlist);
      Promise.all(wishlist.map(id => getProductById(id)))
        .then(products => {
          setWishlist(() => [...new Set(products)]);
        })
        .finally(() => {
          setLoading(false);
        });
    });
    return unsub;
  };

  useEffect(async () => {
    const unsub = await getData();
    return () => unsub();
  }, []);

  if (!user) {
    return (
      <main className="d-flex-center">
        <p>
          Please sign
          <Link href="/signin">
            <span className={s.link}>here</span>
          </Link>
          to see your wishlist.
        </p>
      </main>
    );
  }
  if (loading) {
    return (
      <main className="d-flex-center">
        <Loader show />;
      </main>
    );
  }

  return (
    <main className={s.wishlist}>
      <h1>Wishlist</h1>

      <div className={s.products}>
        {wishlist.length > 0 ? (
          wishlist.map(prod => (
            <ProductCard key={prod.id} data={prod} wishlist />
          ))
        ) : (
          <p>No items found</p>
        )}
      </div>
    </main>
  );
};

export default WishlistPage;
