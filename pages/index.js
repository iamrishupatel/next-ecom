import s from "../styles/Home.module.css";
import { Button } from "artemis-ui";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-white">
      <Hero />
      <ShopByBrands />
    </main>
  );
}

function Hero() {
  return (
    <div className={s.hero}>
      <img src="/Group1.png" alt="" />
      <div className={s.heroContent}>
        <h1>
          Chocolate is good <br /> but shoes are carb-free
        </h1>
        <p>Trendy Shoes, FactoryPrice, Excellent Service</p>
        <Link href="/shop">
          <Button variant="primary" shape="rounded">
            Discover products
          </Button>
        </Link>
      </div>
    </div>
  );
}

function ShopByBrands() {
  return (
    <div className={s.brands}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className={s.svg}
      >
        <path
          fill="#d9d8ff"
          fillOpacity="1"
          d="M0,64L60,69.3C120,75,240,85,360,106.7C480,128,600,160,720,165.3C840,171,960,149,1080,138.7C1200,128,1320,128,1380,128L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>

      <h2>Shop by brands</h2>
      <div className={s.brandsContainer}>
        <Link href="/shop/nike">
          <div className={s.brand}>
            <img src="/nike-logo.png" alt="nike-swoosh" />
          </div>
        </Link>
        <Link href="/shop/puma">
          <div className={s.brand}>
            <img src="/puma-logo.png" alt="" />
          </div>
        </Link>
        <Link href="/shop/reebok">
          <div className={s.brand}>
            <img src="/reebok-logo.png" alt="" />
          </div>
        </Link>
        <Link href="/shop/adidas">
          <div className={s.brand}>
            <img src="/adidas-logo.png" alt="" />
          </div>
        </Link>
      </div>
    </div>
  );
}
