import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './screen/NotFound';
import Login from './screen/Login';
import Home from './screen/Home';
import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar } from './apollo';
function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);


  // const handleLogoutClick = () => {
  //   setIsLoggedIn(false);
  // };

  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? (
              <Home />
            ) : (
              <Login />
            )}
          </Route>
          {/*마지막에 넣어주는 것이 중요 404 not found.*/}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;