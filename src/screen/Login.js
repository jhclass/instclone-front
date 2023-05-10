import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // 추가된 부분
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import React from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/Auth/AuthLayout";
import styled from "styled-components";
import Routes from "./routes";
import { BaseBox } from "../components/shared";
import Button from "../components/Auth/Buttton";
import Input from "../components/Auth/Input";
import LoginForm from "../components/Auth/LoginForm";
const TopBox = styled(BaseBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const BottomBox = styled(BaseBox)`
  margin-top: 20px;
  text-align: center;
`;

const Login = () => {
  return (
    <AuthLayout>
      <TopBox>
        <div style={{ padding: "20px 0" }}>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <LoginForm>
          <Input type="text" placeholder="Username" />
          <Input type="password" placeholder="Password" />
          <Button type="submit" value="Log in" />
        </LoginForm>
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
          Don't have an account?&nbsp;<Link to={Routes.SignUp}>회원가입</Link>
        </span>
      </BottomBox>
    </AuthLayout>
  );
};

export default Login;
