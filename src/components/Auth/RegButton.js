import styled from "styled-components";
const RegButton = styled.input`
  background-color: ${(props) =>
    props.type === "button" ? "blue" : props.theme.blue};
  color: #fff;
  text-align: center;
  padding: 3px 5px;
  border-radius: 3px;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
`;
// const Button = ({ type, placeholder, value }) => {
//   return <SButton type={type} placeholder={placeholder} value={value} />;
// };
export default RegButton;
