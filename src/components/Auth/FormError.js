import styled from "styled-components";
const ErrorBox = styled.p`
  background: ${(props) => props.theme.bgColor};
  margin: 5px 0;
  color: ${(props) => props.theme.fontColor};
`;

const FormError = ({ message }) => {
  return <ErrorBox>{message}</ErrorBox>;
};

export default FormError;
