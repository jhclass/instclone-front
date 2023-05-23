import { createGlobalStyle } from "styled-components";

export const lightMode = {
  fontColor: "#2c2c2c",
  bgColor: "lightgray",
  blue: "#0095f6",
  borderColor: "rgb(219,219,219)",
  formBoxColor: "#ffffff",
};
export const darkMode = {
  fontColor: "lightgray",
  bgColor: "#2c2c2c",
  blue: "#0095f6",
  borderColor: "rgb(219,219,219)",
  formBoxColor: "#2c2c2c",
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
    color:${(props) => props.theme.fontColor}
}
`;
