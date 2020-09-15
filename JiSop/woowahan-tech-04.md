# 우아한테크러닝 React&TypeScript 04


[CodeSandbox](https://codesandbox.io/s/woowa-d04-mdcvh?fontsize=14&hidenavigation=1&theme=dark)



비동기 어싱크 함수

```js
async function asyncFunc() {

}
```

둘 다 promise와 밀접한 연관이 있다.



### 동기와 비동기 비유적 예시

```js
// 동시에 실행 불가능하다 (비유적 표현)
const x = 10;
const y = x * 10;
```

```js
// 동시에 실행 가능하다 (비유적 표현)
const x = () => 10;
const y = x() * 10;
// x 값의 확정을 지연할 수 있다.
// 이런 방식으로 동시성을 구현 가능
```



### 제너레이터

> **코루틴**
>
> 이터레이터는 코루틴
>
> 리턴이 없으면 프로시져
>
> 코루틴의 개념을 차용해서 만든것이 이터레이터

`function*` 키워드로 선언

```js
function* genFunc() {
  /* ... */
}
```

제네레이터는 함수 내부의 상태를 유지한다.

`return`과 다르게 `yield`는 함수를 끝내지 않는다.

```js
function* make() {
  let num = 1;
  while (true) {
    // 일반적인 함수였다면 실행이 종료되지 않고 num의 값이 계속 증가한다.
    yield num++;
  }
}

const i = make();

console.log(i.next());
console.log(i.next());
```

`next()` 메소드를 호출하면 아래와 같은 형태의 객체를 반환한다.

```js
{ value: 1, done: false}
```

객체를 반환 해주는 이유는 상태를 알려주기 위해서 이다.  
(done이 true인 경우 모든 실행이 종료되었음을 의미)

`next()` 메소드는 값을 받을 수도 있다.

```js
function* make() {
  let num = 1;
  while (true) {
    const x = yield num++;
    console.log(x);
  }
}

const i = make();

console.log(i.next());
console.log(i.next("x"));
```

```
// 위의 출력 결과
{value: 1, done: false}
x 
{value: 2, done: false}
```



#### 제너레이터를 응용하면 비동기 코드도 동기 코드처럼 사용할 수 있다

```js
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function* main() {
  console.log("시작");
  yield delay(3000);
  console.log("3초 뒤입니다.");
}

const it = main();

const { value } = it.next();

value.then(() => {
    it.next();
});
```

redux-saga가 비동기를 동기 처럼 사용하게 만들어주는 방법이 이것이다.



## note

> **자식 컴포넌트에서 props를 변경하는 로직을 넣지 않는 이유**
>
> > 하위 컴포넌트가 값을 변경하지 않는것이 안정적이다.
> >
> > 함수형 프로그래밍



> **선언적으로 바꾸려는 이유**
>
> > 훨씬 더 명확하기 때문이다.
> >
> > 의도가 명확하게 보이기 때문



> 커뮤니케이션은 프로토콜이라고 생각한다
>
> 프로토콜 == 약속
>
> 일을 할때 프로토콜이 안맞는 경우가 많다.
>
> 심지어 프로토콜이 안맞는다는 걸 모르는 경우가 있다.

> 지식을 배우는데 가장 효과적인 방법
>
> 알고있던 것도 다시 점검하기 위해 강의 (쏟아내는 방법)

> 정보를 주고 받는 다는건 수준이 같아야 한다.
>
> 레이어라고 생각해보면
>
> 상대방이 이해하는 수준으로 말할 수 있어야한다.
>
> 상대 레이어에 맞게 변환해서 대화 해야한다.
>
> 그렇지 않으면 일방적인 소통
>
> 대화가 이루어지지 않음

> 학습도 맥락이 비슷하다
>
> 지식과 프로토콜이 맞아야 한다.
>
> 나에게 맞는 레이어를 찾아야 한다.

> 타겟 레이어를 정하고
>
> 거기에 맞게 의식적으로 표현

> 상대 레이어를 파악하는 능력을 기르자

> 너무 고급 테크닉에 매몰되지 말자
>
> 고급 기술을 가지고있다고 해서 좋은 엔지니어가 되는 것은 아니다.



## reference

https://gist.github.com/ibare/c7020756170aa7ed3d1cc84f86972409

