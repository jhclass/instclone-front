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
import { useForm } from "react-hook-form";
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
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log("watch", watch());
  const onSubmitValid = (data) => {
    console.log(data);
  };
  const onSubmitInValid = (data) => {
    console.log(data, "invalid");
  };
  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <TopBox>
        <div style={{ padding: "20px 0" }}>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <LoginForm onSubmit={handleSubmit(onSubmitValid, onSubmitInValid)}>
          <Input
            {...register("username", {
              required: "Username is requiered",
              minLength: {
                value: 5,
                message: "아이디는 다섯글자 이상으로 작성하여주세요",
              },
              //validate
              pattern: {
                value: /.*[@].*/,
                message: "이메일전체를 작성하여주세요",
              },
            })}
            name="username"
            type="text"
            placeholder="Username"
          />
          {errors.username ? <p>{errors.username.message}</p> : null}
          <Input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 5,
                message: "패스워드는 5자 이상으로 작성하여주세요.",
              },
            })}
            name="password"
            type="password"
            placeholder="Password"
          />
          <Button type="submit" value="Log in" />
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
