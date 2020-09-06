# 우아한 테크 러닝 3기 1회차(200901)

## 모두의 고민

개발자는 프로그래밍을 통해 문제를 해결하는 것이며, 이 과정에서 다음과 같은 것들을 고민하게 된다.

- 품질이 좋은 코드는 어떤 코드인가
- 보다 효율적인 아키텍쳐는 무엇인가
- 적정기술을 사용하고 있는가

## 도구의 목적을 이해하라

도구가 다양하지 않았던 과거에는 하나의 기능을 구현하기 위해 그 밑바탕의 환경까지 직접 만들어야 했다. 그러나 지금은 각 분야마다 다양한 도구들이 존재한다. 이는 선택의 다양성 측면에서 보자면 좋은 일이지만, 도구의 목적을 고려하지 않았을 때에는 그에 따른 부작용이 뒤따른다는 점도 감안해야 한다. 모든 도구들은 특정한 목적을 갖고 탄생했다. 따라서 도구를 선택할 때에는 단순히 많이 쓰인다고 해서 선택할 게 아니라 현재 내가 직면한 문제를 정확히 파악하고, 해당 문제를 해결하기에 가장 적합한 도구를 선택해야 한다.

### 우아한 테크 러닝 3기에서 다루는 도구들

- [TypeScript](https://www.typescriptlang.org/)
- [React ](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [MobX](https://mobx.js.org/README.html)
- [Redux-Saga](https://redux-saga.js.org/)
- [Blueprint](https://blueprintjs.com/)
- [Testing Library](https://testing-library.com/)

## 타입스크립트 개요

타입스크립트는 자바스크립트의 Superset이라고 할 수 있다. 따라서 자바스크립트의 모든 스펙을 사용 가능하며, 추가적으로 타입스크립트 고유의 스펙이 더해진 일종의 확장판과 같다.

### 변수의 타입 지정

타입스크립트에서 변수의 타입을 지정하는 방법에는 두 가지가 있다. 한 가지는 변수에 할당된 값을 통해 타입스크립트가 추론하는 **암묵적 타입 지정** 그리고, 다른 하나는 특정 변수에 할당할 값의 데이터타입을 작성하는 **명시적 타입 지정** 이다.

```typescript
// 암묵적 타입 지정
let foo = 10;
foo = 'hello'; // type error

// 명시적 타입 지정
let bar: number = 20;
```

### 보다 구체적인 타입 지정

위와 같이 데이터타입을 지정하는 것에서 한 발짝 더 나아가 해당 변수의 의미까지 내포할 수 있는 타입을 지정한다면 보다 보다 명시적일 것이다. 이때는 타입스크립트의 `Type Alias`를 사용하면 된다.

```typescript
type Age = number;
let age: Age = 15;
```

`Type Alias`와 유사한 기능으로 `Interface`가 있다.

```typescript
type Age = number;

let age: Age = 10;

type Foo = {
  age: number;
  name: string;
};

interface Bar {
  age: Age;
  name: string;
}

const foo: Foo = {
  age: 10,
  name: 'Jeong',
};

const bar: Bar = {
  age: 30,
  name: 'Sooyoung',
};
```

언뜻 보기엔 형태적으로나 기능적으로나 큰 차이가 없는 것 같지만, 둘 사이에는 미묘한 차이들이 있다. 자세한 내용은 아래의 스택오버플로우 링크 참고. - [TypeScript: Interfaces vs Types - Stack Overflow](https://stackoverflow.com/a/52682220/12044551)

## 리액트 개요

### CRA를 통한 프로젝트 생성

리액트에서는 `create-react-app`이라는 간편한 프로젝트 생성 도구를 제공하고 있으며, 타입스크립트 템플릿을 적용하여 시작할 수 있다.

```shell
npx create-react-app myapp --template typescript
```

이처럼 CRA를 통한 프로젝트 생성은 webpack과 babel 등 프로젝트 진행 및 빌드에 필요한 갖가지 도구를 포함하기 때문에 편리한 것이 사실이지만, 실제 제품을 만들기에는 아직 부족함이 있다. 물론, `eject`를 통한 커스터마이징이 가능하지만, 되려 손이 많이 가기 때문에 실제 서비스를 위해 초기 세팅을 할 때에는 CRA는 지양하는 편을 추천한다.

### tsconfig

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react"
  },
  "include": ["src"]
}
```

타입스크립트를 적용한 CRA에는 `tsconfig.json` 파일이 자동으로 생성되며 이것은 타입스크립트의 컴파일러 옵션이다. 각 옵션의 자세한 내용은 아래 링크 참고. - [TypeScript: Handbook - tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

### 리액트에서의 타입스크립트 사용 예시

```tsx
//index.tsx
import React from 'react';
import ReactDOM from 'react-dom';

interface AppProps {
  title: string;
  color: string;
}

function App(props: AppProps) {
  return <h1>{props.title}</h1>;
}

ReactDOM.render(
  <React.StrictMode>
    <App title='Wootech' color='blue' />
  </React.StrictMode>,
  document.getElementById('root')
);
```
