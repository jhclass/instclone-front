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
  mutation CreateAccount(
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
            })}
            name="username"
            type="text"
            placeholder="Username"
          />
          <Input
            {...register("firstName", {
              required: "이름이 없습니다.",
            })}
            name="firstName"
            type="text"
            placeholder="First name"
          />
          <Input
            {...register("lastName", {
              required: "성이 없습니다.",
            })}
            name="lastName"
            type="text"
            placeholder="Last name"
          />
          <Input
            {...register("password", {
              required: "비밀번호가 없습니다.",
            })}
            name="password"
            type="password"
            placeholder="Password"
          />
          <Input
            {...register("password2", {
              required: "비밀번호2가 없습니다.",
            })}
            name="password2"
            type="password"
            placeholder="1 more write password plz."
          />
          <Input
            {...register("email", {
              required: "이메일 주소는 필수 입니다.",
            })}
            type="text"
            name="email"
            placeholder="email"
          />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign up"}
            //disabled={errors.username && errors.password ? true : false}
            //위에 처럼 쓸경우에는 폼요소가 많을 경우에는?? 그래서 아래처럼 쓸 수 있지..!
            disabled={!watch("username") || !watch("password") || loading}
          />
          <FormError message={errors?.result?.message} />
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
