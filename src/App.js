import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "./screen/NotFound";
import Login from "./screen/Login";
import Home from "./screen/Home";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar, darkThemeVar, client } from "./apollo";
import { ThemeProvider } from "styled-components";
import { darkMode, lightMode, GlobalStyles } from "./styles";
import SignUp from "./screen/SignUp";
import Routes from "./screen/routes";
import { HelmetProvider } from "react-helmet-async";
import { ApolloProvider } from "@apollo/client";

import Layout from "./components/Auth/Layout";
function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkModeVar = useReactiveVar(darkThemeVar);

  // const handleLogoutClick = () => {
  //   setIsLoggedIn(false);
  // };

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkModeVar ? darkMode : lightMode}>
          <GlobalStyles />

          <Router>
            <Switch>
              <Route path={Routes.Home} exact>
                {isLoggedIn ? (
                  <Layout>
                    <Home />
                  </Layout>
                ) : (
                  <Login />
                )}
              </Route>
              <Route path={Routes.SignUp}>
                {isLoggedIn ? (
                  <Layout>
                    <Home />
                  </Layout>
                ) : (
                  <SignUp />
                )}
              </Route>
              {/*마지막에 넣어주는 것이 중요 404 not found.*/}
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
