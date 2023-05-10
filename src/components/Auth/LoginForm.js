import styled from "styled-components";
const SLogInForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px 0 10px 0;
`;

const LoginForm = ({ children }) => {
  return <SLogInForm>{children}</SLogInForm>;
};
export default LoginForm;
