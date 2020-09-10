# 우아한 테크코스 4강

### 컴포넌트 디자인 및 비동기

```
const App = (props) => {
    const {sessionList} = props.store;

    return (
        <div>
            <header>
            <h1>React and TypeScript</h1>
            </header>
            <ul>
            {sessionList.map((session)=>(
                <li>{session.title}</li>
            ))}
            </ul>
        </div>
    )
}

export default App;
```

ul태그 부분은 컴포넌트로 뺴버리는 것이 더 좋다. 쪼개야할 필요성이 보이면, 적절한 타이밍이다. 그때 쪼개버려라.
아래와 같은 식으로.

```

const SessionItem = ({ title }) => (
   <li>{title}</li>
)

const App = (props) => {
    const {sessionList} = props.store;

    return (
        <div>
            <header>
            <h1>React and TypeScript</h1>
            </header>
            <ul>
            {sessionList.map((session)=>(
                <SessionItem title={session.title} />
            ))}
            </ul>
        </div>
    )
}

export default App;
```

## 함수형 vs 클래스형

```

const SessionItem = ({ title }) => (
   <li>{title}</li>
)

class ClassApp extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            displayOrder: "ASC"
        }
    }

    onToggleDisplayOrder() {
        this.setState({
            displayOrder: displayOrder === 'ASC ? 'DESC' : 'ASC'
        });
    }

    toggleDisplayOrder = () => {
        // 화살표함수라서 this 바인딩이 필요가 없어짐.
        this.setState({
            displayOrder: displayOrder === 'ASC ? 'DESC' : 'ASC'
        });
    }

    render(){
        return (
            <div>
                여기여기
                <button onClick={this.toggleDisplayOrder}>정렬</button>
            </div>
        )
    }
}

const App = (props) => {
    const [displayOrder, toggleDisplayOrder] = React.useState("ASC");
    const {sessionList} = props.store;
    const orderedSessionList = sessionList.map((session,i) => ({
        ...session,
        order: i
    }))

    const onToggleDisplayOrder = () => {
        toggleDisplayOrder(displayOrder === "ASC" ? "DESC" : "ASC")
    }

    return (
        <div>
            <header>
            <h1>React and TypeScript</h1>
            </header>
            <p>전체 세션 갯수: 4개</p>
            <button onClick={onToggleDisplayOrder}>재정렬</button>
            <ul>
            {orderedSessionList.map((session)=>(
                <SessionItem title={session.title} />
            ))}
            </ul>
        </div>
    )
}

export default App;
```

훅이 클로저이다? 훅 자체가 클로저는 아니다.
훅을 사용할때 클로저가 걸린다. 함수 안에서 클로저가 잡히는거다.

모던한 비동기를 쓰는 방법들

```

Promise();


function* foo() {

}

async function bar() {

}
```

```
const x = 10;
const y = x * 10;
```

위 두줄은 동시에 실행 시킬 수 없다.

- x라는 것으로 dependancy가 걸려있다. x 값이 확정되기전에 2번째줄은 실행될 수 없으므로, 순차적으로 실행되어야한다.

```
const x = () => 10;
const y = x() * 10;
```

x값이 확정되는 순간을 지연시킨 것이다.

```
const p = new Promise(function (resolve, reject) {
    setTimeout(()=> {
        resolove("1");
    },1000)
});

p.then(function (r) {
    console.log(r)
})

```

```
function* make() {
    return 1;
}

const i = make();

console.log(i);  // 제네레이터 객체를 줌.
```

```
function xyz(x) {
    // ...
    return 0;
}
```

이런걸 함수라고한다.
return이 없으면 프로시저라고도 함.

함수인데 리턴을 여러번 할 수 있게 하면 어떨까? 의 개념에서 나온게 코루틴.
<b>코루틴</b>의 일부개념을 활용해서 제너레이터를 만들 었음.

## 제너레이터

```
function* makeNumber() {
    let num = 1;

    while(true){
        yield num++;  // 함수를 끝내지 않음, return처럼
    }
}

const i = makeNumber();   // 준비

i.next();   // 실행 언제까지? yield가 나올때 까지  -> console.로 찍으면 object {value: 1, done: false} 가 나옴.
            // done이 true일때까지 끝난게 아니다.

i.next();       //object {value: 2, done: false}
i.next();       //object {value: 3, done: false}

```

```
function* makeNumber() {
    let num = 1;

    while(true){
        const x = yield num++;
        console.log(x);    // 출력값 : x
    }
}

const i = makeNumber();   // 준비

i.next('a');
i.next('x');

```

```
function* makeNumber() {
    let num = 1;

    while(true){
        const x = yield num++;
        console.log(x);    // 출력값 : x
    }
}

const delay = ms => new Promise((resolve) => setTimeout(resolve, ms));

function* main() {
    console.log('시작')
    yield delay(3000);
    console.log('3초뒤')
}
// 동기 코드처럼 보임, 바깥쪽에서 함수 안쪽을 제어하고, 함수안쪽에선 마치 비동기적상황도 동기적으로 풀 수 있는 순서대로 마치 진행되는 듯이.

const it = main();

// const promise = it.next()

// console.log(promise);   // value에 promise 객체가 옴.

const {value} = it.next()

value.then(()=> {
    it.next()
})

<!-- delay(3000).then(()=> {
    console.log('3초 뒤');   // 3초 뒤에 표시, 콜백함수 구조이다.
}) -->

```
