import Link from "next/link";
import { useRouter } from "next/router";

import s from "./Navbar.module.css";
import { AiOutlineShopping, AiFillShopping } from "react-icons/ai";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button } from "artemis-ui";
import { signout } from "../../features/authSlice";

const Navbar = () => {
  const router = useRouter();
  const user = useSelector(state => state.auth);
  const cartLength = useSelector(state => state.cart.length);
  const dispatch = useDispatch();

  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleSignout = () => {
    dispatch(signout());
  };
  const openNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  const closeNav = () => {
    setIsNavOpen(false);
  };

  const navigateUser = () => {
    router.push("/user");
  };

  return (
    <Fragment>
      {!user && (
        <div className={s.header}>
          <Link href="/signin">
            <Button variant="primary-light" shape="rounded" size="sm">
              Sign In
            </Button>
          </Link>
        </div>
      )}
      {user && (
        <div className={s.header}>
          <Fragment>
            <Avatar
              src={user.photoURL}
              alt={user.displayName}
              shape="circle"
              size="sm"
              onClick={navigateUser}
            />

            <p onClick={navigateUser}> {user.displayName}</p>
          </Fragment>
          <div className={s.signout}>
            <Button
              variant="danger-light"
              shape="rounded"
              size="sm"
              onClick={handleSignout}
            >
              Log Out
            </Button>
          </div>
        </div>
      )}
      <nav className={s.nav}>
        <h1>
          <Link href="/">The Shoe Bay</Link>
        </h1>
        <div
          id={isNavOpen ? s.hamburgerActive : null}
          className={s.hamburger}
          onClick={openNav}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <NavLinks isNavOpen={isNavOpen}>
          <NavLink path="/" closeNav={closeNav}>
            Home
          </NavLink>
          <NavLink path="/shop" closeNav={closeNav}>
            Shop
          </NavLink>
          <NavLink path="/wishlist" closeNav={closeNav}>
            Wishlist
          </NavLink>

          <IconNavLink
            path="/cart"
            closeNav={closeNav}
            icon={<AiOutlineShopping />}
            activeIcon={<AiFillShopping />}
          >
            {cartLength}
          </IconNavLink>
        </NavLinks>
      </nav>
    </Fragment>
  );
};

export default Navbar;

function NavLinks({ isNavOpen, children }) {
  return <ul className={isNavOpen ? s.activeNav : null}>{children}</ul>;
}

function NavLink({ path, children, closeNav }) {
  const router = useRouter();
  return (
    <li
      className={router.pathname === path ? s.active : null}
      onClick={closeNav}
    >
      <Link href={path}>{children}</Link>
    </li>
  );
}

function IconNavLink({ path, icon, activeIcon, children, closeNav }) {
  const router = useRouter();
  return (
    <li onClick={closeNav}>
      <Link href={path}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: router.pathname === path ? "#271fe0" : "",
          }}
        >
          {router.pathname === path ? activeIcon : icon}
          {children}
        </div>
      </Link>
    </li>
  );
}
