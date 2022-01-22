import { useEffect } from "react";
import ProductCard from "../../components/Products/ProductCard";
import { query, getDocs, where, orderBy } from "firebase/firestore";
import { productRef } from "../../firebase";
import styles from "../../styles/Shop.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addIntialProducts } from "../../features/productsSlice";

import Link from "next/link";
import { useRouter } from "next/router";
import { Breadcrumb, Crumb } from "../../components/BreadCrumb/Breadcrumb";
import BrandsFilter from "../../components/Filters/Brands";
import Relevance from "../../components/Filters/Relevance";

export const getStaticProps = async () => {
  let data = [];

  const querySnapshot = await getDocs(query(productRef));
  querySnapshot.forEach(doc => {
    data = [...data, { id: doc.id, ...doc.data(), createdAt: null }];
  });

  return {
    props: {
      data,
    },
  };
};

const ShopPage = ({ data }) => {
  const prods = useSelector(state => state.products);
  const dispatch = useDispatch();
  const router = useRouter();
  const { sort } = router.query;

  const getByRelevance = async () => {
    let data = [];
    const splittedSort = sort.split("-");
    const q = query(productRef, orderBy(splittedSort[0], splittedSort[1]));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      data = [
        ...new Set([
          ...data,
          { id: doc.id, ...doc.data(), createdAt: new Date(data.createdAt) },
        ]),
      ];
    });

    dispatch(addIntialProducts(data));
  };

  useEffect(() => {
    dispatch(addIntialProducts(data));
  }, []);

  useEffect(() => {
    if (router.query.sort) return getByRelevance();
  }, [router]);

  return (
    <main className={styles.shop}>
      <div className={styles.breadcrumb}>
        <Breadcrumb>
          <Crumb>
            <Link href="/"> Home </Link>
          </Crumb>
          <Crumb last>Shop</Crumb>
        </Breadcrumb>
      </div>

      <div className={styles.filters}>
        <Relevance />
        <BrandsFilter />
      </div>

      <div className={styles.products}>
        {prods.map(prod => (
          <ProductCard key={prod.id} data={prod} />
        ))}
      </div>
    </main>
  );
};

export default ShopPage;
