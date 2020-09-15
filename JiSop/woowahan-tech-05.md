# 우아한테크러닝 React&TypeScript 05



[CodeSandbox](https://codesandbox.io/s/woowa-d5-tun5g?file=/src/index.js)



## 리덕스 미들웨어

리듀서는 순수 함수여야만 한다.

외부와 아무런 디펜던시 없이, 내부적으로 사이드 이팩트 없이

> 인풋이 똑같으면 아웃풋도 똑같아야 한다.



그렇다면 순수하지 않은 것은?

비동기 작업, API 호출

> 결과 예측이 안된다.



순수하지 않은 상황을 어떻게 다를 것인가

리듀서의 구조로는 스테이트의 상태를 업데이트하는 것이 불가능하다.

> 리듀서는 동기 함수이기 때문



리덕스는 기본적으로 동기적인 상태만 관리한다.

비동기적 처리는 리듀서 밖에서 해야한다.



> 미들웨어를 직접적으로 만들 상황은 사실 거의 없지만,
>
> 지연호출에 대한 개념을 익히기 위해 미들웨어 학습
>
> 리덕스 공식 문서에 스텝 바이 스텝으로 상세하게 적혀있다.



```js
// 1.
const myMiddleware = store => dispatch => action => {
  dispatch(action);
};
```

```js
// 2.
/*
	클로저 때문에 가능하다
	함수형 프로그래밍에서 커링이라고 한다.
*/
function yourMiddleware(store) {
  return function (dispatch) {
    return function (action) {
      dispatch(action);
    };
  };
}
```

```js
// 3.
function ourMiddleware(store, dispatch, action) {
  dispatch(action);
}
```

같은 점 모두 실행하는 함수가 같다

1과 2는 문법적 차이

다른 점 중첩이 다르다(스코프가 다르다)



> 코드를 수정하는 건 비용이 크다
>
> 그렇기 때문에 코드를 가능한 수정하는 않는 방식을 사용
>
> **몽키패칭**



```js
let next = store.dispatch; // 원본 디스패치
store.dispatch = function dispatchAndLog(action) { // 변경한 디스패치
  console.log('dispatching', action);
  let result = next(action); // 클로저로 받아 옴
  console.log('next state', store.getState());
  return result;
};
```



플러그인은 필요한 경우 데이터를 받는다.



미들웨어는 모든 데이터 흐름을 중간에서 받는다.

정해진 항상 순서대로 흐름을 받는다.

순서에 디펜던시가 존재하는 미들웨어도 있다.



```js
/* 
  add1은 사용자가 중간에 개입 할 여지가 없다
*/
const add1 = function (a, b) {
  return a + b;
};

/* 
  add2는 사용자가 중간에 개입 할 여지가 있다
  몽키패칭을 할 수 있는 구조이다!
*/
const add2 = function (a) {
  return function (b) {
    return a + b;
  };
};

add1(10, 20); // 30
add2(10)(20); // 30

const addTen = add2(10);

// 함수 합성

addTen(30);

console.log(addTen(30));
console.log(addTen(40));

// 커링이란 결국 사용자가 개입 할 수 있는 여지를 만들어주는 테크닉

// 커링으로 만들면 미들웨어가 개입할 수 있는 여지를 만들어 준다
// 리덕스가 개입 할 수 있는 여지

```



> 각각 세 가지로 커링 된 함수이다.
>
> [] 미들웨어를 가진 배열을 반전하는 이유 복습

```js
// 미들웨어의 기본적인 형태
const myMiddleware = store => next => action => {
  /* ... */
  next(action);
};
```



비즈니스 로직의 플로우를 제어할 수도 있다.





## reference

https://dobbit.github.io/redux/advanced/Middleware.html

