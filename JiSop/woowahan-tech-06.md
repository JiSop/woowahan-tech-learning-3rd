# 우아한테크러닝 React&TypeScript 06



## WebPack

웹팩은 거대한 친구!

> 거대한 플랫폼 같은 친구!

문제가 생겼을 때 사실 웹팩은 별로 잘못이 없다.

> 그 안에 있는 친구들이 문제를 일으키는 경우가 대부분



### 로더

첫 번째 파일을 기준으로 빌드를 시작하고 그 파일을 기준으로 머지를 한다.

```json
{
  /* ... */
	entry: ""
}
```

대표적으로 바벨이 있다.

모듈을 기술해서 설정을 변경할 수 있다. (미들웨어와 비슷한 개념)

> 로더는 컨버팅이라고 생각하면 된다.



### 플러그인

플러그인은 로더에 비해 더 많은 일을 할 수 있다.

보통의 플러그인은 로더의 프로세싱이 끝난 뒤 실행된다.

> 플러그인은 후처리를 한다고 생각하면 된다.



사용하는 로더나 플러그인에 따라서 추가 설정을 해야하는 경우가 (드럽게)많다. 🤦‍♂️

> 팀에서 사용하는 적절한 설정을 맞추었다고 해도 버전업 같은 변화에 맞춰 계속 관리해 주어야 한다.



TS같은 경우 예전에는 따로 로더가 존재하였지만 지금은 바벨안에 통합되었다.

> 바벨안에 다시 설정을 위한 플러그인이 존재한다. (마트료시카인가?)



## note

> 비동기 코드를 동기처럼 작동하게 만드는 것이 실제 동기 코드와 같게 동작한다고 생각하면 안된다.

> 목표와 목적을 정하고 학습해라
