import Link from "next/link";
import { useSelector } from "react-redux";

// Component's children only shown to ADMIN users

export default function AuthCheck(props) {
  const user = useSelector(state => state.auth);
  

  return user && user.id ? (
    <div>{props.children}</div>
  ) : (
    props.fallback || <Link href="/signin">You must be signed in</Link>
  );
}
