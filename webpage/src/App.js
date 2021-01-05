import './App.css';
import Timeline from './views/Timeline/Timeline';

import { BrowserRouter, Redirect, Route } from "react-router-dom"
import Login from './views/Login/Login';
import Register from './views/Register/Register';

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
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/timeline/:email" component={Timeline} />
      <Redirect to='/login'/>
    </BrowserRouter>
  );
}

export default App;
