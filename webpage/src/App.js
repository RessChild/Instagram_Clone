import './App.css';
import Timeline from './views/Timeline/Timeline';

import { BrowserRouter, Route } from "react-router-dom"

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

  // react-router
  return (
    <BrowserRouter>
      <Route exact path="/:email" component={Timeline} />
    </BrowserRouter>
  );
}

export default App;
