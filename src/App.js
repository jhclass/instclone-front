import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './screen/NotFound';
import Login from './screen/Login';
import Home from './screen/Home';
import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar, darkThemeVar } from './apollo';
import styled, { ThemeProvider } from 'styled-components';
import { darkMode, lightMode, GlobalStyles } from './styles';


function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkModeVar = useReactiveVar(darkThemeVar);

  // const handleLogoutClick = () => {
  //   setIsLoggedIn(false);
  // };

  const Wrapper = styled.div`
  width: 1080px;
  margin: 0 auto;
 
  
`;


  return (
    <ThemeProvider theme={darkModeVar ? darkMode : lightMode}>
      <GlobalStyles />
      <Wrapper >

        <Router>
          <Switch>
            <Route path="/" exact>
              {
                isLoggedIn ? (
                  <Home />
                ) : (
                  <Login />
                )
              }
            </Route >
            {/*마지막에 넣어주는 것이 중요 404 not found.*/}
            < Route >
              <NotFound />
            </Route >
          </Switch >
        </Router >


      </Wrapper >
    </ThemeProvider>
  );
}

export default App;