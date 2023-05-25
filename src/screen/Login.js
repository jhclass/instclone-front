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
import FormError from "../components/Auth/FormError";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { LogUserIn } from "../apollo";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
const TopBox = styled(BaseBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => props.theme.formBoxColor};
`;
const BottomBox = styled(BaseBox)`
  margin-top: 20px;
  text-align: center;
  background-color: ${(props) => props.theme.formBoxColor};
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const Login = () => {
  // signup 에서 로그인 확인 후 메세지 가져오기
  const location = useLocation();
  //console.log("loca", location);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    },
  });
  //console.log("watch", watch());
  const onCompleted = (data) => {
    //console.log(data);
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      setError("result", {
        message: error,
      });
    }
    //console.log(token);
    if (token) {
      LogUserIn(token);
    }
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  // const onSubmitInValid = (data) => {
  //   console.log(data, "invalid");
  // };
  const onSubmitValid = (data) => {
    //console.log(data);
    const { username, password } = getValues();
    //console.log(username);
    if (loading) {
      return;
    }
    login({
      variables: {
        username,
        password,
      },
    });
  };
  console.log(Object.keys(errors).length);
  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <TopBox>
        <div style={{ padding: "20px 0" }}>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <span>{location?.state?.message}</span>
        <LoginForm onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("username", {
              required: "Username is requiered",
              minLength: {
                value: 3,
                message: "아이디는 다섯글자 이상으로 작성하여주세요",
              },
              //validate
              // pattern: {
              //   value: /.*[@].*/,
              //   message: "이메일전체를 작성하여주세요",
              // },
            })}
            name="username"
            type="text"
            placeholder="Username"
            hasError={Boolean(errors.username)}
          />
          {errors.username ? (
            <FormError message={errors.username.message} />
          ) : null}
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
            hasError={Boolean(errors.password)}
          />

          {errors.password ? (
            <FormError message={errors.password.message} />
          ) : null}
          <Button
            type="submit"
            value={loading ? "Loading..." : "Log in"}
            //disabled={errors.username && errors.password ? true : false}
            //위에 처럼 쓸경우에는 폼요소가 많을 경우에는?? 그래서 아래처럼 쓸 수 있지..!
            disabled={!watch("username") || !watch("password") || loading}
          />
          <FormError message={errors?.result?.message} />
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
