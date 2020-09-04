/* 가장 기본적인 형태의 리액트 앱 */
import React from 'react';
import ReactDOM from 'react-dom';

interface AppProps {
  title: string;
  color: string;
}

/* props는 객체로 트렌트 파일링 되기 때문에 객체이다 */
function App(props: AppProps) {
  return(
    <h1>{ props.title }</h1>
  )
}

/*
  ReactDOM.render는 최상위에 하나만 존재
  DOM 처럼 단일트리 구조
*/
ReactDOM.render(
  <React.StrictMode>
    <App title="Tech Hello" color="red" />
  </React.StrictMode>,
  document.getElementById('root') 
); // 트렌스 파일링 됨, 컴포넌트를 DOM으로 만들어서 root에 붙일꺼야
