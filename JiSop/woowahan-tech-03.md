# 우아한테크러닝 React&TypeScript 03



## 간단한 리액트 구현



### 버추얼 돔 구조

```js
const vdom = {
  type: `ul`,
  props: {},
  children: [
    { type: `li`, props: { className: "item" }, children: "React" },
    { type: `li`, props: { className: "item" }, children: "Redux" },
    { type: `li`, props: { className: "item" }, children: "TypeScript" }
  ]
};
```



### createElements

버추얼 돔을 만드는 친구

DOM으로 컨버팅한다.

```js
function createElements(type, props = {}, ...children) {
  return { type, props, children };
}
```

바벨 옵션 주석

```js
/* @jsx createElement */
```

> 리액트 컴포넌트는 왜 대문자로 시작해야하는가
>
> > 바벨이 해석하는 방식 때문에 컴포넌트는 대문자로 시작해야한다.
> >
> > 대문자로 시작하면 함수

```js
function createElement(type, props = {}, ...children) {
  if (typeof type === "function") {
    return type.apply(null, [props, ...children]);
  }
  return { type, props, children };
}
```



### render

버추얼 돔을 돔으로 컨버팅

```js
function render(vdom, container) {
  container.appendChild(renderElement(vdom));
}
```



### renderElement

재귀 함수이다

모든 요소를 파악해야 함으로 

```js
function renderElement(node) {
  // 방어 코드
  // 가장 하위 요소는 문자열이 된다.
  if (typeof node === "string") {
    return document.createTextNode(node);
  }

  const el = document.createElement(node.type);

  // 자식 요소 렌더링
  node.children.map(renderElement).forEach((element) => {
    el.appendChild(element);
  });

  return el;
}
```



### 전체 코드

```js
/* @jsx createElement */

function renderElement(node) {
  // 방어 코드
  // 가장 하위 요소는 문자열이 된다.
  if (typeof node === "string") {
    return document.createTextNode(node);
  }

  const el = document.createElement(node.type);

  // 자식 요소 렌더링
  node.children.map(renderElement).forEach((element) => {
    el.appendChild(element);
  });

  return el;
}

function render(vdom, container) {
  // 여기에 기존 버추얼 돔과 비교하는 로직이 들어온다
  container.appendChild(renderElement(vdom));
}

// 바벨리 트렌스 파일링 할때 jsx 형태로 바뀜
// 컴파일 타임에 일어남
function createElement(type, props = {}, ...children) {
  if (typeof type === "function") {
    return type.apply(null, [props, ...children]);
  }
  return { type, props, children };
}

function Row(props) {
  return <li>{props.label}</li>;
}

function List(props) {
  return (
    <ul>
      <Row label="핫챠" />
      <li>React</li>
      <li>Redux</li>
      <li>TypeScript</li>
    </ul>
  );
}

function App() {
  return (
    <div>
      <h1>Hello</h1>
      <List />
    </div>
  );
}

render(<App />, document.getElementById("root"));
console.log(<App />);

```