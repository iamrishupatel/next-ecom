import Link from "next/link";
import { useRouter } from "next/router";
import s from "./styles/Sidebar.module.css";

const SideBar = () => {
  const router = useRouter();
  return (
    <div className={s.sidebar}>
      <ul>
        <li
          className={router.pathname === "/admin/add" ? s.activeLink : ""}
        >
          <Link href="/admin/add">Add Product</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
