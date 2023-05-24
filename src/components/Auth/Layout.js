import styled from "styled-components";
import Header from "../Header";
import { Wrapper } from "../../styles";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Wrapper>{children}</Wrapper>
    </>
  );
};
export default Layout;
