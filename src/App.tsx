import React, { useRef, useState } from "react";
import classNames from 'classnames';
import NavBar from "./components/NavBar";
import Tabs from "./components/Tabs";
import BannerImage from "./assets/banner.png";
import FooterImage from "./assets/footer.jpg";
import Category from "./components/Category";
import styles from "./styles.module.scss";
import { dataSource } from "./constants/data";

function App() {
  const oldYRef = useRef<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState<boolean>(false);

  const onScroll = () => {
    if (contentRef.current) {
      const { top: newY } = contentRef.current.getBoundingClientRect();

      const delta = newY - oldYRef.current;
      oldYRef.current = newY;
      if (delta < 0) {
        // 向上滚，Y会变小
        // 隐藏NavBar
        setHidden(true);
      } else {
        setHidden(false);
      }
    }
  };

  return (
    <div className={styles.app}>
      <header className={classNames(styles.header, {[styles.hidden]: hidden})}>
        <NavBar title="首页 " />

        <Tabs />
      </header>

      <div className={styles.line}></div>

      <div className={styles.scrollView} onScroll={onScroll}>
        <img className={styles.banner} src={BannerImage} alt="Banner" />

        <div ref={contentRef} className={styles.content}>
          <h2>{dataSource.hot.title}</h2>
          <Category list={dataSource.hot.list} />

          <h2>{dataSource.live.title}</h2>
          <Category list={dataSource.live.list} />

          <h2>{dataSource.recommend.title}</h2>
          <Category list={dataSource.recommend.list} />
        </div>

        <img className={styles.banner} src={FooterImage} alt="Footer" />

        <footer className={styles.footer}>
          <span>@Bilibili 2023</span>
        </footer>
      </div>
    </div>
  );
}

export default App;
