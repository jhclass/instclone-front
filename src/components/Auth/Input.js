import styled from "styled-components";
const SInput = styled.input`
  display: block;
  width: 300px;
  margin-bottom: 10px;
  padding: 10px;

  border: 1px solid ${(props) => props.theme.borderColor};
`;
const Input = (props) => {
  return <SInput {...props} />;
};
export default Input;
