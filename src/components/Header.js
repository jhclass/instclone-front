import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
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
  svg {
    height: 34px;
  }
`;
const Nav = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  svg {
    margin-left: 26px;
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
`;
const Button = styled.span`
  background-color: ${(props) => props.theme.blue};
  border-radius: 4px;
  padding: 5px 15px;
  color: white;
  font-weight: 600;
`;

const User = styled.div`
  vertical-align: middle;
  width: 34px;
  height: 34px;
  margin-left: 26px;
  border-radius: 100%;
  overflow: hidden;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
  img {
    width: 100%;
  }
`;

const Header = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();

  // console.log("로그인", data?.me?.avatar);
  return (
    <SHeader>
      <Wrapper>
        <HeaderContainer>
          <Logo>
            <Link to={Routes.Home}>
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
          </Logo>
          {/**로고 */}
          <Nav>
            {isLoggedIn ? (
              <>
                {" "}
                <FontAwesomeIcon icon={faHome} />
                <FontAwesomeIcon icon={faCompass} />
                <Link to={`/user/${data?.me?.username}`}>
                  {data?.me?.avatar ? (
                    <User>
                      <img src={data?.me?.avatar} alt={data?.me?.username} />
                    </User>
                  ) : (
                    <User>
                      <img
                        src="./img/defaultUser.png"
                        alt={data?.me?.username}
                      />
                    </User>
                  )}
                </Link>
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
