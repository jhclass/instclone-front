import styled from "styled-components";
import Header from "../Header";
import { Wrapper } from "../../styles";
const Content = styled.main`
  margin-top: 4vh;
  padding: 0 2vw;
`;
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Wrapper>
        <Content>{children}</Content>
      </Wrapper>
    </>
  );
};
export default Layout;
