import styled from "styled-components";
const Button = styled.input`
  background-color: ${(props) => props.theme.blue};
  color: #fff;
  text-align: center;
  padding: 15px 0;
  margin-top: 20px;
`;
// const Button = ({ type, placeholder, value }) => {
//   return <SButton type={type} placeholder={placeholder} value={value} />;
// };
export default Button;
