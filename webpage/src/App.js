import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import axios from "axios";
import Timeline from './views/Timeline/Timeline';

function App() {

  // useEffect(() => {
  //   // 일반 경로 테스트
  //   axios.get('/example')
  //     .then( ({ data }) => console.log("example test:", data) )
  //     .catch( e => console.log(e) );

  //   // DB 연동 테스트
  //   axios.get('/example/database')
  //     .then( ({ data }) => console.log("database test:", data) )
  //     .catch( e => console.log(e) );
  // }, [])

  return (
    <Timeline />
  );
}

export default App;
