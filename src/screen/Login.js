import React from "react";
import { darkThemeVar, isLoggedInVar } from "../apollo";
import styled from "styled-components";

const Container = styled.div`
background-color: ${props => props.theme.bgColor};
color:${props => props.theme.fontColor}
`;
const Login = () => {

    return (
        <Container>
            <h1>login</h1>

        </Container>

    )
}

export default Login;