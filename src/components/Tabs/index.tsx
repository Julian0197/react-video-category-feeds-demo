import { FC } from "react";
import styles from "./styles.module.scss";

const Tabs: FC = () => {
  return (
    // 语义化标签
    <div className={styles.tabs}>
      <ul>
        <li>大会员</li>
        <li>消息</li>
        <li>动态</li>
      </ul>
    </div>
  );
};

export default Tabs;
