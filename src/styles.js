import { createGlobalStyle } from "styled-components";

export const lightMode = {
  fontColor: "#2c2c2c",
  bgColor: "lightgray",
  blue: "#0095f6",
  borderColor: "rgb(219,219,219)",
};
export const darkMode = {
  fontColor: "lightgray",
  bgColor: "black",
  blue: "#0095f6",
  borderColor: "rgb(219,219,219)",
};

export const GlobalStyles = createGlobalStyle`
input {
  all:unset;
}
*{
  box-sizing:border-box;
}
body {
    font-size: 14px;
    background-color: ${(props) => props.theme.bgColor};
}
`;
