import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Link from "next/link";
import Slider from "react-slick";
import {
  Rate,
  Button,
  Tab,
  TabGroup,
  TabPanels,
  Tabs,
  TabPanel,
  Select,
  Badge,
  Option,
  Drawer,
} from "artemis-ui";
import { AiOutlineCheck, AiOutlineShoppingCart } from "react-icons/ai";
import {
  MdOutlineNavigateBefore,
  MdOutlineNavigateNext,
  MdOutlineDangerous,
} from "react-icons/md";
import ReactMarkdown from "react-markdown";
import { addToBasket } from "../../features/cartSlice";
import {
  addItemToWishList,
  getProductById,
} from "../../firebase/firebaseCalls";
import { getDocs } from "firebase/firestore";

import { v4 } from "uuid";
import { productRef } from "../../firebase";
import toast from "react-hot-toast";
import { Breadcrumb, Crumb } from "../../components/BreadCrumb/Breadcrumb";

// style
import s from "../../styles/ProductPage.module.css";

export const getStaticProps = async ({ params }) => {
  const { productId } = params;
  const product = await getProductById(productId);
  return {
    props: {
      product: { ...product, createdAt: null },
    },
    revalidate: 5000,
  };
};

export const getStaticPaths = async () => {
  let paths = [];

  const querySnapshot = await getDocs(productRef);
  querySnapshot.forEach(doc => {
    paths = [...paths, { params: { productId: doc.id } }];
  });

  return {
    paths,
    fallback: "blocking",
  };
};

const ProductPage = ({ product }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth);

  const [productForCart, setProductForCart] = useState({
    id: v4(),
    productId: product.id,
    name: product.name,
    quantity: 1,
    color: product.colors[0],
    size: product.sizes[0],
    price: product.price,
    thumbnailURL: product.thumbnailURL,
    brand: product.brand,
    rating: product.rating,
  });

  const setColor = e => {
    const selectedColor = product.colors.filter(
      color => color.label === e.target.value
    )[0];
    setProductForCart(prevProd => ({
      ...prevProd,
      color: selectedColor,
    }));
  };

  const setSize = e => {
    const selectedSize = product.sizes.filter(
      size => size.label === e.target.value
    )[0];
    setProductForCart(prevProd => ({
      ...prevProd,
      size: selectedSize,
    }));
  };

  const addToCart = () => {
    setProductForCart(prevState => ({ ...prevState, id: v4() }));
    dispatch(addToBasket(productForCart));
    toast.success("Added to cart");
  };

  const addToWishList = () => {
    if (!user) return toast.error("Please sign in to proceed");
    const toastId = toast.loading("Adding...");
    addItemToWishList(user.id, product.id)
      .then(() =>
        toast.success("Added successfully to wishlist", {
          id: toastId,
        })
      )
      .catch(err => {
        toast.error(
          "Unable to add to wishlist. Please try again after some time",
          {
            id: toastId,
          }
        );
        console.log(err);
      });
  };

  const formatINR = price => {
    return price.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  console.log("STOCK", product.stock);

  return (
    <main>
      <div className={s.breadcrumb}>
        <Breadcrumb>
          <Crumb>
            <Link href="/"> Home </Link>
          </Crumb>
          <Crumb>
            <Link href="/shop"> Shop </Link>
          </Crumb>
          <Crumb last>{product.id}</Crumb>
        </Breadcrumb>
      </div>
      <div className={s.container}>
        <MyCarousel product={product} />

        {/* ========== ===========*/}
        <div className={s.details}>
          <h1>{product.name}</h1>
          <h2>{formatINR(Number(product.price))}</h2>
          <Rate value={product.rating} />
          {Number(product.stock) > 0 ? (
            <Badge
              variant="success"
              size="sm"
              icon={<AiOutlineCheck />}
              children="In stock"
            />
          ) : (
            <Badge
              variant="danger"
              size="sm"
              icon={<MdOutlineDangerous />}
              children="Out of stock"
            />
          )}

          <p>{product.description}</p>

          {/* ======= color selection ====== */}
          <div className={s.select}>
            <label>Color</label>
            <Select name="color" onChange={setColor}>
              {product.colors.map(color => (
                <Option key={color.value} value={color.label}>
                  {color.label}
                </Option>
              ))}
            </Select>
          </div>
          {/* ======= size selection ====== */}
          <div className={s.select}>
            <label>Size</label>
            <Select name="Size" onChange={setSize}>
              {product.sizes.map(size => (
                <Option key={size.value} value={size.value}>
                  {size.label}
                </Option>
              ))}
            </Select>
          </div>

          <div className={s.actions}>
            <Button
              shape="rounded"
              variant="primary"
              size="sm"
              onClick={addToCart}
              disabled={Number(product.stock) === 0}
            >
              <AiOutlineShoppingCart /> Add to cart
            </Button>
            <Button
              shape="rounded"
              variant="primary-light"
              size="sm"
              onClick={addToWishList}
            >
              Add to wishlist
            </Button>
          </div>
        </div>
      </div>

      <div className={s.moreDetails}>
        <h3>Details</h3>
        <TabGroup shape="rounded">
          <Tabs>
            <Tab>Specifications</Tab>
          </Tabs>
          <TabPanels>
            <TabPanel>
              <ReactMarkdown className="react-markdown">
                {product.details}
              </ReactMarkdown>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </main>
  );
};

export default ProductPage;

function MyCarousel({ product }) {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div className={s.carousel}>
      <Slider {...sliderSettings} className={s.imagesContainer}>
        {product.images.map((url, index) => (
          <div key={index} className={s.carouselImg}>
            <img src={url} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <MdOutlineNavigateNext
      className={className}
      style={{ ...style, color: "black" }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <MdOutlineNavigateBefore
      className={className}
      style={{ ...style, color: "black" }}
      onClick={onClick}
    />
  );
}
