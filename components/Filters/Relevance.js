import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import s from "./Filters.module.css";
import { BiArrowBack } from "react-icons/bi";

const Relevance = () => {
  const router = useRouter();
  const { query } = router;
  const { brand } = query;

  const [isVisible, setIsVisible] = useState(false);

  const myQuery = brand
    ? {
        brand: brand,
      }
    : {};

  const hideRelevance = () => {
    setIsVisible(false);
  };

  const showRelevance = () => {
    if (window.innerWidth > 880) return;
    setIsVisible(true);
  };

  const pathname = brand ? `/shop/[brand]` : "/shop";

  return (
    <div className={s.filter}>
      <p className={s.title} onClick={showRelevance}>
        Relevance
      </p>
      <ul className={isVisible ? s.listActive : null}>
        <li className={s.back} onClick={hideRelevance}>
          <BiArrowBack style={{ marginRight: "0.4rem" }} /> Go back
        </li>

        <li className={query.sort === "createdAt-desc" ? s.active : null}>
          <Link
            href={{
              pathname,
              query: { ...myQuery, sort: "createdAt-desc" },
            }}
          >
            Latest arrivals
          </Link>
        </li>
        <li className={query.sort === "rating-desc" ? s.active : null}>
          <Link
            href={{
              pathname,
              query: { ...myQuery, sort: "rating-desc" },
            }}
          >
            Highest rated
          </Link>
        </li>
        <li className={query.sort === "rating-asc" ? s.active : null}>
          <Link
            href={{
              pathname,
              query: { ...myQuery, sort: "rating-asc" },
            }}
          >
            Lowest rated
          </Link>
        </li>
        <li className={query.sort === "price-asc" ? s.active : null}>
          <Link
            href={{
              pathname,
              query: { ...myQuery, sort: "price-asc" },
            }}
          >
            Price low to high
          </Link>
        </li>
        <li className={query.sort === "price-desc" ? s.active : null}>
          <Link
            href={{
              pathname,
              query: { ...myQuery, sort: "price-desc" },
            }}
          >
            Price high to low
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Relevance;
