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

const SignUp = () => {
  return (
    <AuthLayout>
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

        <LoginForm>
          <Input type="text" placeholder="Username" />
          <Input type="text" placeholder="First name" />
          <Input type="text" placeholder="Last name" />
          <Input type="password" placeholder="Password" />
          <Input type="password" placeholder="1 more write password plz." />
          <Input type="password" placeholder="email" />

          <Button type="submit" value="Sign up !" />
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
