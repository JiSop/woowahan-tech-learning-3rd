# 우아한 테크코스 3강

### redux

pub-sub모델을 활용 : 구독모델을 구현한 것

## react를 만들어보자

```
const list = [
    {title: "React에 대해 알아봅시다."},
    {title: "React에 대해 알아봅시다."},
    {title: "React에 대해 알아봅시다."}
];

const rootElement = document.getElementById('root');

function app(){
    rootElement.innerHTML = `
        <ul>
            ${list.map((item)= > `<li>${item.title}</li>`).join("")}
        </ul>
    `;
}

app();
```

같은 것들은 묶고, 다른 것들은 분리하자 라는 대원칙 적용

```
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
    return (
        <div>
            <h1>hello?</h1>
            <ul>
                <li>react</li>
                <li>redux</li>
                <li>typescript</li>
                <li>mobx</li>
            </ul>
        </div>
        <h1>1</h1>;
    )
}

ReactDom.render(<App />, document.getElementById("root"));
```
