import styled from "styled-components";
const SSparator = styled.div`
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Separator = ({ children }) => {
  return <SSparator>{children}</SSparator>;
};
export default Separator;
