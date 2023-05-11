import styled from "styled-components";
const Button = styled.input`
  background-color: ${(props) =>
    props.type === "button" ? "blue" : props.theme.blue};
  color: #fff;
  text-align: center;
  height: 40px;
  margin-top: 20px;
  width: 320px;
  border-radius: 10px;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
`;
// const Button = ({ type, placeholder, value }) => {
//   return <SButton type={type} placeholder={placeholder} value={value} />;
// };
export default Button;
