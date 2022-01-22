import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { query, getDocs, where, orderBy } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";

import styles from "../../styles/Shop.module.css";

import { addIntialProducts } from "../../features/productsSlice";
import { productRef } from "../../firebase";

import ProductCard from "../../components/Products/ProductCard";
import { Breadcrumb, Crumb } from "../../components/BreadCrumb/Breadcrumb";
import BrandsFilter from "../../components/Filters/Brands";
import Relevance from "../../components/Filters/Relevance";

export const getStaticProps = async ({ params }) => {
  const { brand } = params;
  let data = [];

  const querySnapshot = await getDocs(
    query(productRef, where("brand", "==", brand))
  );
  querySnapshot.forEach(doc => {
    data = [...data, { id: doc.id, ...doc.data(), createdAt: null }];
  });

  return {
    props: {
      data,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = [
    { params: { brand: "nike" } },
    { params: { brand: "puma" } },
    { params: { brand: "reebok" } },
    { params: { brand: "adidas" } },
  ];

  return {
    paths,
    fallback: "blocking",
  };
};

const BrandPage = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const prods = useSelector(state => state.products);

  const { brand } = router.query;

  const getByRelevance = async () => {
    const { sort } = router.query;
    const splittedSort = sort.split("-");
    let data = [];
    const q = query(
      productRef,
      where("brand", "==", brand),
      orderBy(splittedSort[0], splittedSort[1])
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      data = [
        ...new Set([...data, { id: doc.id, ...doc.data(), createdAt: null }]),
      ];
    });

    dispatch(addIntialProducts(data));
  };

  useEffect(() => {
    dispatch(addIntialProducts(data));
  }, [data]);

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
          <Crumb>
            <Link href="/shop"> Shop</Link>
          </Crumb>
          <Crumb last>{brand.toUpperCase()}</Crumb>
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

export default BrandPage;
