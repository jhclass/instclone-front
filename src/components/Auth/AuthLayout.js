import { useReactiveVar } from "@apollo/client";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Wrapper } from "../../styles";
import styled from "styled-components";
import { darkThemeVar, disableDarkmode, enableDarkMode } from "../../apollo";
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Footer = styled.div`
  margin-top: 20px;
`;
const DarkModeBtn = styled.span`
  cursor: pointer;
  font-size: 30px;
`;

const AuthLayout = ({ children }) => {
  const darkMode = useReactiveVar(darkThemeVar);
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
      <Footer>
        <DarkModeBtn onClick={darkMode ? disableDarkmode : enableDarkMode}>
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </DarkModeBtn>
      </Footer>
    </Container>
  );
};

export default AuthLayout;
