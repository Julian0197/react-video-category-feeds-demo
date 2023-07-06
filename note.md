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