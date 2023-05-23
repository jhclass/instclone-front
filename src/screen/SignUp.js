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
import Separator from "../components/Auth/Separator";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import FormError from "../components/Auth/FormError";
import { gql, useMutation } from "@apollo/client";
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

const SubTitle = styled.div`
  text-align: center;
  font-size: 20px;
  line-height: 1.5;
  font-weight: bold;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $password: String!
    $firstName: String!
    $email: String!
  ) {
    createAccount(
      username: $username
      password: $password
      firstName: $firstName
      email: $email
    ) {
      ok

      error
    }
  }
`;

const SignUp = () => {
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    setError,
  } = useForm({ mode: "onChange" });

  console.log(watch());
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }

    createAccount({
      variables: {
        ...data,
      },
    });
    console.log(data, "데이터");
  };
  return (
    <AuthLayout>
      <PageTitle title={"Join"} />
      <TopBox>
        <div style={{ padding: "20px 0" }}>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <SubTitle>Sign up to See photos and videos from your friends.</SubTitle>
        <Separator>
          <Button type="button" value="Log in with Facebook" />
          <span style={{ fontSize: 18, fontWeight: 600, marginTop: 20 }}>
            Or
          </span>
        </Separator>

        <LoginForm onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("username", {
              required: "아이디는 필수입니다.",
              minLength: {
                value: 2,
                message: "아이디가 제대로 입력되지 않았습니다.",
              },
            })}
            name="username"
            type="text"
            placeholder="Username"
            hasError={Boolean(errors.username)}
          />
          {errors.username ? (
            <FormError message={errors?.username.message} />
          ) : null}
          <Input
            {...register("firstName", {
              required: "이름이 없습니다.",
              minLength: {
                value: 1,
                message: "이름을 제대로 작성하세요",
              },
            })}
            name="firstName"
            type="text"
            placeholder="First name"
            hasError={Boolean(errors.firstName)}
          />
          {errors.firstName ? (
            <FormError message={errors?.firstName.message} />
          ) : null}
          <Input
            {...register("lastName", {
              required: "성이 없습니다.",
              minLength: {
                value: 1,
                message: "당신의 성은 무엇입니까?",
              },
            })}
            name="lastName"
            type="text"
            placeholder="Last name"
            hasError={Boolean(errors.lastName)}
          />
          {errors.lastName ? (
            <FormError message={errors?.lastName.message} />
          ) : null}
          <Input
            {...register("password", {
              required: "비밀번호가 없습니다.",
              minLength: {
                value: 5,
                message: "메세지는 최소 5글자 이상이어야 합니다.",
              },
            })}
            name="password"
            type="password"
            placeholder="Password"
            hasError={Boolean(errors.password)}
          />
          <Input
            {...register("password2", {
              required: "비밀번호2가 없습니다.",
              validate: (value) => {
                return value === getValues("password")
                  ? ""
                  : "비밀번호가 일치하지 않습니다.";
              },
            })}
            name="password2"
            type="password"
            placeholder="1 more write password plz."
            hasError={Boolean(errors.password2)}
          />
          {errors.password2 ? (
            <FormError message={errors?.password2.message} />
          ) : null}
          <Input
            {...register("email", {
              required: "이메일 주소는 필수 입니다.",
              pattern: {
                value: /.*[@].*/,
                message: "이메일전체를 작성하여주세요",
              },
            })}
            type="text"
            name="email"
            placeholder="email"
            hasError={Boolean(errors.password)}
          />
          {errors.email ? <FormError message={errors.email.message} /> : null}
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign up"}
            //disabled={errors.username && errors.password ? true : false}
            //위에 처럼 쓸경우에는 폼요소가 많을 경우에는?? 그래서 아래처럼 쓸 수 있지..!
            disabled={!watch("username") || !watch("password") || loading}
          />
          {errors.result ? (
            <FormError message={errors?.result?.message} />
          ) : null}
        </LoginForm>
      </TopBox>
      <BottomBox>
        <span>
          <span style={{ fontWeight: 600 }}>Have an account?</span>&nbsp;
          <Link to={Routes.Home}>로그인</Link>
        </span>
      </BottomBox>
    </AuthLayout>
  );
};

export default SignUp;
