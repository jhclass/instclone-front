import styled from "styled-components";
const SLogInForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px 0 10px 0;
`;

const LoginForm = ({ children, onSubmit }) => {
  return <SLogInForm onSubmit={onSubmit}>{children}</SLogInForm>;
};
export default LoginForm;
