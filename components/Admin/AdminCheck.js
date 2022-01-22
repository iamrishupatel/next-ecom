import Link from "next/link";
import { useSelector } from "react-redux";
import SideBar from "./SideBar";
import s from "./styles/Admincheck.module.css";

// Component's children only shown to ADMIN users

export default function AdminCheck(props) {
  const user = useSelector(state => state.auth);

  return user?.ROLE === "ADMIN" ? (
    <div className={s.admincheck}>
      <SideBar />
      {props.children}
    </div>
  ) : (
    props.fallback || (
      <main className="d-flex-center">
        <div style={{ textAlign: "center" }}>
          You must have admin privilages. <br /> Sign in with an admin account
          <Link href="/signin">
            <span style={{ textDecoration: "underline", marginLeft: "4px" }}>
              here
            </span>
          </Link>
        </div>
      </main>
    )
  );
}
