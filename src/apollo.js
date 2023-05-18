import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { HttpLink } from "apollo-client-preset";
export const isLoggedInVar = makeVar(false);
export const darkThemeVar = makeVar(false);
const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });
export const client = new ApolloClient({
  //uri: "http://localhost:4000/graphql",
  link: httpLink,
  cache: new InMemoryCache(),
});
