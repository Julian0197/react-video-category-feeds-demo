### ts类型声明

ts不认识mp4后缀文件，需要声明类型

~~~ts
declare module '.*mp4' {
  const src: string;
  export default src;
}
~~~

why?

### react 组件传值


### react组件的`FC`类型是什么？

~~~ts
type FC<P = {}> = FunctionComponent<P>;

interface FunctionComponent<P = {}> {
    (props: P, context?: any): ReactElement<any, any> | null;
    propTypes?: WeakValidationMap<P> | undefined;
    contextTypes?: ValidationMap<any> | undefined;
    defaultProps?: Partial<P> | undefined;
    displayName?: string | undefined;
}
~~~

### 为什么不建议用top做动画

~~~scss
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  transform: translateY(0);
  transition: transform 250ms;
  // 不建议用top做动画
  // 如果用top做动画，会经过浏览器渲染三个阶段（Layout，Paint，Composite）
  // transition: top 250ms;
  &.hidden {
    transform: translateY(-56px);
    // top: -56px;
  }
}
~~~

建议使用`transform`来实现动画，而不是使用`top`，是因为使用`top`会触发浏览器的重排（Layout）和重绘（Paint）操作。

当使用`top`属性进行动画时，浏览器会重新计算元素的布局（Layout），确定元素的位置。这个过程是比较耗时的，因为浏览器需要重新计算元素的大小和位置，然后重新布局页面。

而使用`transform`属性进行动画时，浏览器不需要重新计算元素的布局，只需要对元素进行变换即可。变换操作（transform）是在图层（Layer）上进行的，不会影响到其他元素的布局。这样可以避免触发浏览器的重排操作，提高动画的性能和流畅度。

另外，使用`transform`属性进行动画还能利用硬件加速（Hardware Acceleration）来提高性能。浏览器会将使用`transform`属性进行动画的元素单独创建一个图层，并交给GPU进行处理，这样可以加速动画的渲染过程。 