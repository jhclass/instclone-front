import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCompass, faUser } from "@fortawesome/free-regular-svg-icons";
import useUser from "../hooks/useUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom/cjs/react-router-dom";
import styled from "styled-components";
import { Wrapper } from "../styles";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import Routes from "../screen/routes";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";
const SHeader = styled.div`
  background-color: rgba(255, 255, 255, 0.3);
  padding: 14px 14px;
`;
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled.div`
  cursor: pointer;
  box-sizing: border-box;
`;
const Nav = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  svg {
    margin-left: 20px;
  }
`;
const Button = styled.span`
  background-color: ${(props) => props.theme.blue};
  border-radius: 4px;
  padding: 5px 15px;
  color: white;
  font-weight: 600;
`;

const Header = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const loggedInUser = useUser();
  console.log("로그인", loggedInUser);
  return (
    <SHeader>
      <Wrapper>
        <HeaderContainer>
          <Logo>
            <Link to={Routes.Home}>
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </Link>
          </Logo>
          {/**로고 */}
          <Nav>
            {isLoggedIn ? (
              <>
                {" "}
                <FontAwesomeIcon icon={faHome} size="lg" />
                <FontAwesomeIcon icon={faCompass} size="lg" />
                <FontAwesomeIcon icon={faUser} size="lg" />
              </>
            ) : (
              <Link to={Routes.Login}>
                {" "}
                <Button>Login</Button>
              </Link>
            )}
          </Nav>
          {/** 아이콘 */}
        </HeaderContainer>
      </Wrapper>
    </SHeader>
  );
};

export default Header;
