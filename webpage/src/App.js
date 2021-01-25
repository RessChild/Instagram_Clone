import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"

import Home from "./views/Home/Home";
import Timeline from './views/Timeline/Timeline';
import Login from './views/Login/Login';
import Register from './views/Register/Register';


import NewPost from './views/NewPost/NewPost';
import Account from './views/Account/Account';

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
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/account" component={Account} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/timeline/:email" component={Timeline} />
        <Redirect to='/'/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
