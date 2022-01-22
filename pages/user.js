import { useSelector } from "react-redux";
import AuthCheck from "../components/AuthCheck";
import { Button } from "artemis-ui";
import { signout } from "../features/authSlice";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch } from "react-redux";
// styles
import s from "../styles/User.module.css";

const UserPage = () => {
  const user = useSelector(state => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleNavigate = () => {
    router.push("wishlist");
  };
  const handleSignout = () => {
    dispatch(signout());
    router.push("/");
  };

  if (!user) {
    return (
      <main className="d-flex-center">
        <p>
          Please sign
          <Link href="/signin">
            <span className={s.link}>here</span>
          </Link>
        </p>
      </main>
    );
  }

  return (
    <AuthCheck>
      <main className={s.user}>
        <img src={user.photoURL} alt="" />
        <h2>{user.displayName}</h2>
        <p>{user.email}</p>
        <div>
          <Button
            variant="primary"
            shape="rounded"
            size="sm"
            onClick={handleNavigate}
          >
            Wish List
          </Button>
          <Button
            variant="danger-light"
            shape="rounded"
            size="sm"
            onClick={handleSignout}
          >
            Log Out
          </Button>
        </div>
      </main>
    </AuthCheck>
  );
};

export default UserPage;
