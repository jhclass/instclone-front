import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCompass, faUser } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom/cjs/react-router-dom";
import styled from "styled-components";
import { Wrapper } from "../styles";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import Routes from "../screen/routes";
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

const Header = () => {
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
            <FontAwesomeIcon icon={faHome} size="lg" />
            <FontAwesomeIcon icon={faCompass} size="lg" />
            <FontAwesomeIcon icon={faUser} size="lg" />
          </Nav>
          {/** 아이콘 */}
        </HeaderContainer>
      </Wrapper>
    </SHeader>
  );
};

export default Header;
