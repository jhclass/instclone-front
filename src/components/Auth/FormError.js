import styled from "styled-components";
const ErrorBox = styled.p`
  background: #eee;
  margin: 5px 0;
`;

const FormError = ({ message }) => {
  return <ErrorBox>{message}</ErrorBox>;
};

export default FormError;
