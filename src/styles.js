import styled, { createGlobalStyle } from "styled-components";

export const lightMode = {
  fontColor: "#2c2c2c",
  bgColor: "lightgray",
  blue: "#0095f6",
  borderColor: "rgb(219,219,219)",
  focusBorderColor: "rgb(38,38,38)",
  formBoxColor: "#ffffff",
};
export const darkMode = {
  fontColor: "lightgray",
  bgColor: "#2c2c2c",
  blue: "#0095f6",
  borderColor: "rgb(219,219,219)",
  focusBorderColor: "rgb(255,255,255)",
  formBoxColor: "#2c2c2c",
};

export const Wrapper = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
`;

export const FormWrap = styled.div`
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
`;
export const GlobalStyles = createGlobalStyle`
input {
  all:unset;
}
*{
  
  box-sizing:border-box;
}
body {
  width:100%;
  overflow-x:hidden;;
    font-size: 14px;
    background-color: ${(props) => props.theme.bgColor};
    color:${(props) => props.theme.fontColor}
}
a {color:${(props) => props.theme.fontColor}; text-decoration:none;}

`;
