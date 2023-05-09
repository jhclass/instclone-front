import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // 추가된 부분
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import React from "react";

import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;
const WhiteBox = styled.div`
  background-color: white;
  border: 1px solid rgb(219, 219, 219);
  padding: 20px;
`;

const TopBox = styled(WhiteBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const BottomBox = styled(WhiteBox)`
  margin-top: 20px;
  text-align: center;
`;
const LogInForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px 0 10px 0;
  input {
    display: block;
    width: 300px;
    margin-bottom: 10px;
    padding: 10px;

    border: 1px solid rgb(219, 219, 219);
    &:last-child {
      width: 322px;
      background-color: #0095f6;
      color: #fff;
    }
  }
`;
const Login = () => {
  return (
    <Container>
      <Wrapper>
        <TopBox>
          <div style={{ padding: "20px 0" }}>
            <FontAwesomeIcon icon={faInstagram} size="3x" />
          </div>
          <LogInForm>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <input type="submit" value="Log in" />
          </LogInForm>
          <div
            style={{
              lineHeight: 1.5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span>Or</span>
            <span>Log in with Facebook</span>
          </div>
        </TopBox>
        <BottomBox>
          <span>
            Don't have an account?&nbsp;<a href="#">회원가입</a>
          </span>
        </BottomBox>
      </Wrapper>
    </Container>
  );
};

export default Login;
