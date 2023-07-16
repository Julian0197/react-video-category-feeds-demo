import {FC, HTMLAttributes} from "react"
import { VideoData } from "../../constants/data"
import styles from './styles.module.scss'

interface Props extends HTMLAttributes<HTMLDivElement>{
  // 父组件传递的onScrolll其实是div本身的属性
  // onScroll: () => void
  list: VideoData[]
}

const Category: FC<Props> = (props) => {
  const { list, ...divProps } = props;

  return (
    // 语义化标签
    <div {...divProps} className={styles.category}>
      <ul>
      {list.map(videoData => (
        <li key={videoData.id}>
          <video data-video-id={videoData.id} loop muted src={videoData.src}></video>
        </li>
      ))}
    </ul>
    </div>
  )
}

export default Category