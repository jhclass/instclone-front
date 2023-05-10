import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // 추가된 부분
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import React from "react";
import { Link } from "react-router-dom";

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
  border: 1px solid ${(props) => props.theme.borderColor};
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
`;
const Input = styled.input`
  display: block;
  width: 300px;
  margin-bottom: 10px;
  padding: 10px;

  border: 1px solid ${(props) => props.theme.borderColor};
`;
const Button = styled.input`
  background-color: ${(props) => props.theme.blue};
  color: #fff;
  text-align: center;
  padding: 15px 0;
  margin-top: 20px;
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
            <Input type="text" placeholder="Username" />
            <Input type="password" placeholder="Password" />
            <Button type="submit" value="Log in" />
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
            Don't have an account?&nbsp;<Link to="/join">회원가입</Link>
          </span>
        </BottomBox>
      </Wrapper>
    </Container>
  );
};

export default Login;
