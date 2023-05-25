import {
  ApolloClient,
  InMemoryCache,
  makeVar,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";
//import { HttpLink, setContext } from "apollo-client-preset";

const TOKEN = "token";
const DARK_MODE = "darkmode";

export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enabled");
  darkThemeVar(true);
};

export const disableDarkmode = () => {
  localStorage.removeItem(DARK_MODE);
  darkThemeVar(false);
};

//export const isLoggedInVar = makeVar(false);
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const darkThemeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));
const httpLink = createHttpLink({ uri: "http://localhost:4000/graphql" });
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext((context) => ({
    headers: {
      ...context.headers,
      token: localStorage.getItem(TOKEN),
    },
  }));
  return forward(operation);
});

export const client = new ApolloClient({
  //uri: "http://localhost:4000/graphql",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
export const LogUserIn = (token) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};
export const LogUserOut = (history) => {
  localStorage.removeItem(TOKEN);
  history?.replace();
  window.location.reload();
};
