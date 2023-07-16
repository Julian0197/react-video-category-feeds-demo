import React, { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import NavBar from "./components/NavBar";
import Tabs from "./components/Tabs";
import BannerImage from "./assets/banner.png";
import FooterImage from "./assets/footer.jpg";
import Category from "./components/Category";
import styles from "./styles.module.scss";
import { dataSource } from "./constants/data";
import { debounce } from "lodash";

function App() {
  const oldYRef = useRef<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState<boolean>(false);
  const playingIds = useRef<string[]>([]);
  const isScrolling = useRef<boolean>(false);

  const playAll = (ids: string[]) => {
    if (ids.length === 0) return;
    // 一次挑选出所有要播放的元素
    // 数组ids中的每个字符串作为属性值，生成一个选择器数组。
    // 每个选择器都是一个以"data-video-id"为属性名，对应id值为数组中的每个字符串的选择器
    const selector = ids.map((id) => `[data-video-id="${id}"]`).join(",");
    const videoEls: HTMLVideoElement[] = Array.from(
      document.querySelectorAll(selector)
    );
    videoEls.forEach((video) => video.play());
  };

  const stopAll = (ids: string[]) => {
    if (ids.length === 0) return;
    const selector = ids.map((id) => `[data-video-id="${id}"]`).join(",");
    const videoEls: HTMLVideoElement[] = Array.from(
      document.querySelectorAll(selector)
    );
    videoEls.forEach((video) => {
      video.pause();
      video.currentTime = 0;
    });
  };

  const pauseAll = (ids: string[]) => {
    if (ids.length === 0) return;
    const selector = ids.map((id) => `[data-video-id="${id}"]`).join(",");
    const videoEls: HTMLVideoElement[] = Array.from(
      document.querySelectorAll(selector)
    );
    videoEls.forEach((video) => video.pause());
  };

  const isInView = (el: HTMLVideoElement) => {
    const { top, bottom, left, right } = el.getBoundingClientRect();
  
    // 水平方向
    const isHorizontalInView = 0 < left && right < window.innerWidth;
    // 垂直方向
    const isVerticalInView = top < window.innerHeight / 2 && window.innerHeight / 2 < bottom;
    // 最终结果
    return isHorizontalInView && isVerticalInView;
  }

  // 停下来超过500ms，认为是scrollEnd
  const onScrollEnd = useCallback(debounce(() => {
    const videoEls = Array.from(document.querySelectorAll('video'));

    // 找到命中规则的视频
    const inViewVideoEls = videoEls.filter(el => isInView(el));

    if (inViewVideoEls.length > 0) {
      const ids: string[] = inViewVideoEls.map(el => el.getAttribute('data-video-id') || '');

      // 旧视频（以前的 Id 不在这次播放列表中的）
      const stopIds = playingIds.current.filter(id => !ids.includes(id));
      stopAll(stopIds);

      // 播放新视频
      playAll(ids);
    } else {
      playAll(playingIds.current);
    }

    isScrolling.current = false;
  }, 500), [])

  const onScroll = () => {
    // 一滚动就暂停视频播放
    if (!isScrolling.current) {
      pauseAll(playingIds.current);
    }
    isScrolling.current = true;

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
    onScrollEnd()
  };

  useEffect(() => {
    const initVideoIds = dataSource.hot.list.slice(0, 2).map((item) => item.id);
    playAll(initVideoIds);
    playingIds.current = initVideoIds;
  }, []);

  return (
    <div className={styles.app}>
      <header
        className={classNames(styles.header, { [styles.hidden]: hidden })}
      >
        <NavBar title="首页 " />

        <Tabs />
      </header>

      <div className={styles.line}></div>

      <div className={styles.scrollView} onScroll={onScroll}>
        <img className={styles.banner} src={BannerImage} alt="Banner" />

        <div ref={contentRef} className={styles.content}>
          <h2>{dataSource.hot.title}</h2>
          <Category onScroll={onScroll} list={dataSource.hot.list} />

          <h2>{dataSource.live.title}</h2>
          <Category onScroll={onScroll} list={dataSource.live.list} />

          <h2>{dataSource.recommend.title}</h2>
          <Category onScroll={onScroll} list={dataSource.recommend.list} />
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
