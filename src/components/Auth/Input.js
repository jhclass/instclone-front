import styled from "styled-components";
const Input = styled.input`
  display: block;
  width: 300px;
  margin-top: 10px;
  padding: 10px;

  border: 1px solid
    ${(props) => (props.hasError ? "red" : props.theme.borderColor)};
  &:focus {
    border: 1px solid ${(props) => props.theme.focusBorderColor};
  }
  &:nth-of-type(1) {
    margin-top: 0;
  }
`;
// const Input = (props) => {
//   return <SInput {...props} />;
// };
export default Input;
