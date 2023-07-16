import { FC } from "react";
import styles from "./styles.module.scss";
import { LeftOutlined } from "@ant-design/icons";

interface Props {
  title: string;
}

const NavBar: FC<Props> = (props) => {
  return (
    // 语义化标签
    <nav className={styles.navBar}>
      <span className={styles.icon}>
        <LeftOutlined />
      </span>
      <span>{props.title}</span>
    </nav>
  );
};

export default NavBar;
