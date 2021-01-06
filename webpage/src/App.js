import './App.css';
import Timeline from './views/Timeline/Timeline';

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import Login from './views/Login/Login';
import Register from './views/Register/Register';


import NewPost from './views/NewPost/NewPost';

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
        <Route path="/test" component={NewPost} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/timeline/:email" component={Timeline} />
        <Redirect to='/login'/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
