import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // 추가된 부분
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/Auth/AuthLayout";
import styled from "styled-components";
import Routes from "./routes";
import { BaseBox } from "../components/shared";
import Button from "../components/Auth/Buttton";
import Input from "../components/Auth/Input";
import LoginForm from "../components/Auth/LoginForm";
import Separator from "../components/Auth/Separator";

import PageTitle from "../components/PageTitle";
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
  const [inputValue, setInputValue] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const onChange = (e) => {
    console.log(e.target.value);
    setUsernameError("");
    setInputValue(e.target.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (inputValue.length < 10) {
      setUsernameError("too Short!");
    }
    if (inputValue === "") {
      setUsernameError("Not Empty plz.");
    }
  };
  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <TopBox>
        <div style={{ padding: "20px 0" }}>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <LoginForm onSubmit={onSubmitHandler}>
          <Input
            type="text"
            placeholder="Username"
            onChange={onChange}
            value={inputValue}
          />
          <span>{usernameError}</span>
          <Input type="password" placeholder="Password" />
          <Button
            type="submit"
            value="Log in"
            disabled={inputValue === "" || inputValue.length < 5}
          />
        </LoginForm>
        <Separator>
          <span style={{ fontSize: 18, fontWeight: 600 }}>Or</span>
          <span>Log in with Facebook</span>
        </Separator>
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
