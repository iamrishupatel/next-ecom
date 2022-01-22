import { AiOutlineRight } from "react-icons/ai";
import s from "./Breadcrumb.module.css";

export const Breadcrumb = ({ children, ...props }) => {
  return (
    <div className={s.breadcrumb} {...props}>
      {children}
    </div>
  );
};
export const Crumb = ({ children, last }) => {
  return (
    <div className={s.crumb}>
      {children}
      {!last ? <AiOutlineRight className={s.icon} /> : null}
    </div>
  );
};
