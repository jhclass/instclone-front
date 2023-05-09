import { createGlobalStyle } from "styled-components"

export const lightMode = {
    fontColor: "#2c2c2c",
    bgColor: "lightgray"
}
export const darkMode = {
    fontColor: "lightgray",
    bgColor: "black"

}

export const GlobalStyles = createGlobalStyle`
body {
    background-color: ${props => props.theme.bgColor};
}
`;

