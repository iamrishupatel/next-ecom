import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import s from "./Filters.module.css";
import { BiArrowBack } from "react-icons/bi";

const BrandsFilter = () => {
  const router = useRouter();
  const { brand } = router.query;

  const [isVisible, setIsVisible] = useState(false);

  const hideBrands = () => {
    setIsVisible(false);
  };

  const showBrands = () => {
    if (window.innerWidth > 880) return;
    setIsVisible(true);
  };

  return (
    <div className={s.filter}>
      <p className={s.title} onClick={showBrands}>
        Brand
      </p>
      <ul className={isVisible ? s.listActive : null}>
        <li className={s.back} onClick={hideBrands}>
          <BiArrowBack style={{ marginRight: "0.4rem" }} /> Go back
        </li>
        <li className={brand === "nike" ? s.active : null}>
          <Link href="/shop/nike"> Nike</Link>
        </li>
        <li className={brand === "puma" ? s.active : null}>
          <Link href="/shop/puma"> Puma </Link>
        </li>
        <li className={brand === "reebok" ? s.active : null}>
          <Link href="/shop/reebok"> Reebok </Link>
        </li>
        <li className={brand === "adidas" ? s.active : null}>
          <Link href="/shop/adidas"> Adidas </Link>
        </li>
        <li>
          <Link href="/shop"> Reset </Link>
        </li>
      </ul>
    </div>
  );
};

export default BrandsFilter;
