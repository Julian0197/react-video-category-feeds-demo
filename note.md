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

### document.querySelector(`[data-video-id="${id}"]`)

`[data-video-id="${id}"]` 是 CSS 选择器语法，用于选择带有指定 data-video-id 属性值的元素。

### useEffect一上来执行

useEffect在组件首次渲染完成后会立即执行一次回调函数。这意味着无论依赖数组中的值是否发生变化，useEffect都会在组件首次渲染完成后执行一次。

如果不希望在组件首次渲染时执行回调函数，可以通过在回调函数中添加条件判断来控制执行的时机。比如可以使用一个状态变量来判断是否是首次渲染，然后在回调函数中根据这个状态变量来决定是否执行副作用操作。

```jsx
import React, { useEffect, useState } from 'react';

function MyComponent() {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    // 执行副作用操作
    // ...
  }, [/* 依赖数组 */]);

  // 组件渲染的其余部分
  // ...
}
```

### lodash的debounce

lodash的debounce函数是用来限制一个函数在一定时间内的连续调用次数的。它的实现原理是通过使用定时器来延迟执行函数，如果在延迟时间内再次调用了该函数，则会取消之前的定时器，重新设置新的定时器。

具体的实现步骤如下：

1. 定义一个变量`timer`，用于存储定时器的标识。

2. 当调用debounce函数时，获取传入的函数和延迟时间。

3. 在函数内部，通过闭包保存函数的上下文和参数。

4. 在函数内部，判断之前是否已经设置了定时器，如果有，则取消之前的定时器。

5. 在函数内部，通过`setTimeout`函数设置新的定时器，延迟执行传入的函数。

6. 在定时器的回调函数中，调用传入的函数，并将之前保存的上下文和参数传递给它。

下面是一个简单的lodash debounce函数的实现示例：

```javascript
function debounce(func, delay) {
  let timer;
  
  return function() {
    const context = this;
    const args = arguments;
    
    if (timer) {
      clearTimeout(timer);
    }
    
    timer = setTimeout(function() {
      func.apply(context, args);
    }, delay);
  };
}
```

使用debounce函数可以将一个函数包装成一个具有限制连续调用次数的函数。例如：

```javascript
function doSomething() {
  console.log('Doing something...');
}

const debouncedDoSomething = debounce(doSomething, 1000);

debouncedDoSomething(); // 第一次调用
debouncedDoSomething(); // 在1000ms内再次调用，会取消之前的定时器
debouncedDoSomething(); // 在1000ms内再次调用，会取消之前的定时器
```

上述示例中，`doSomething`函数在1000ms内只会被调用一次，后续的调用会被忽略。

### useCallback

React 的 useCallback 是一个用于性能优化的 Hook。它的作用是用来缓存函数，以便在组件重新渲染时，避免不必要的函数创建。

在 React 中，每当组件重新渲染时，函数组件中的函数会被重新创建。这可能会导致一些问题，特别是当这些函数作为 props 传递给子组件时，可能会导致子组件不必要的重新渲染。

useCallback 可以用来解决这个问题。它接受一个回调函数和一个依赖数组作为参数，并返回一个缓存的版本的回调函数。当依赖数组中的任何一个值发生变化时，才会重新创建这个回调函数。

下面是一个使用 useCallback 的例子：

```jsx
import React, { useState, useCallback } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
```

在上面的例子中，handleClick 函数通过 useCallback 缓存起来。它的依赖项是 count，这意味着只有当 count 发生变化时，才会重新创建 handleClick 函数。

这样做的好处是，当组件重新渲染时，handleClick 函数不会被重新创建，从而避免了子组件不必要的重新渲染。

需要注意的是，由于 useCallback 会缓存函数，因此当依赖项变化时，返回的函数引用也会发生变化。因此，如果将 useCallback 返回的函数传递给子组件时，需要使用 memo 或者 React.memo 进行包裹，以避免子组件不必要的重新渲染。

#### 为什么react中组件渲染，函数为重新创建？

因为**函数组件本质上是一个 JavaScript 函数**。每当组件重新渲染时，React 会调用函数组件来生成新的虚拟 DOM 树，然后与之前的虚拟 DOM 树进行比较，最终更新真实的 DOM。

由于 JavaScript 是一门基于值的语言，函数是一种特殊的对象，**每次函数定义时都会创建一个新的函数对象**。因此，当组件重新渲染时，函数组件会被重新调用，从而创建一个新的函数对象。