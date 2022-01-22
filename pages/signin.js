import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { signInWithGoogle } from "../firebase/firebaseCalls";
import { signin } from "../features/authSlice";
import toast from "react-hot-toast";

import { Button } from "artemis-ui";

const SignInPage = () => {
  const router = useRouter();
  const user = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const clickHandler = () => {
    const toastId = toast.loading("Signing in...");
    signInWithGoogle()
      .then(user => {
        dispatch(signin(user));
        toast.success("Sign in success!", {
          id: toastId,
        });
      })
      .catch(error => {
        toast.error(error.message, {
          id: toastId,
        });
        console.log(error);
      })
      .finally(() => {
        // toast.dismiss(toastId);
      });
  };

  if (user && user.id) {
    router.push("/");
    return <div></div>;
  }

  const center = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
  return (
    <main
      style={center}
    >
      <Button onClick={clickHandler} variant="primary" shape="rounded">
        <div
          style={center}
        >
          <img src="/google-icon-logo.png" alt="google" height="24px" />
          Sign in with Google
        </div>
      </Button>
    </main>
  );
};

export default SignInPage;
