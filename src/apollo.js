import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { HttpLink } from "apollo-client-preset";
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
const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });
export const client = new ApolloClient({
  //uri: "http://localhost:4000/graphql",
  link: httpLink,
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
