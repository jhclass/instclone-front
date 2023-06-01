import { LogUserOut } from "../apollo";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useQuery, gql } from "@apollo/client";
import { FatText } from "../components/shared";
import styled from "styled-components";
import { Wrapper } from "../styles";
import Avatar from "../components/Auth/Avartar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faComment,
  faHeart,
  faMessage,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faPlane } from "@fortawesome/free-solid-svg-icons";

const PhotoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
`;

const FeedBox = styled.div`
  padding: 10px;
  width: 100%;
  max-width: 610px;
  margin: 10px;
  border: 1px solid ${(props) => props.theme.borderColor};
`;
const FeedPadding = styled.div`
  padding: 5px 0;
`;
const FeedHead = styled(FeedPadding)`
  display: flex;
  align-items: center;
`;
const Username = styled(FatText)`
  margin-left: 20px;
  color: ${(props) => props.theme.fontColor};
`;

const FeedIcon = styled(FeedPadding)`
  display: flex;
  justify-content: space-between;
  padding: 10px 5px;
  cursor: pointer;
  div {
    display: flex;
    font-size: 20px;
    align-items: center;
    color: ${(props) => props.theme.fontColor};
  }
`;
const FeedPhoto = styled(FeedPadding)`
  width: 100%;
`;
const FeedImg = styled.img`
  width: 100%;
`;
const FeedCaption = styled(FeedPadding)`
  color: ${(props) => props.theme.fontColor};
`;
const SeeDetails = styled.span`
  display: inline-block;
  margin-top: 20px;
  cursor: pointer;
  font-size: 12px;
  color: ${(props) => props.theme.fontColor};
`;
const PhotoAction = styled.div`
  margin-right: 20px;
`;
const Likes = styled(FatText)`
  display: block;
  margin-bottom: 10px;
  color: #ff5252;
`;
const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      caption
      isMine
      comments
      createdAt
      user {
        username
        avatar
      }
      likes
      file
      isLiked
    }
  }
`;

const Home = () => {
  const history = useHistory();
  const { data } = useQuery(FEED_QUERY);
  //console.log(data);
  return (
    <Wrapper>
      <h1>home1</h1>
      <button onClick={() => LogUserOut(history)}> logout!</button>
      <PhotoContainer>
        {data?.seeFeed?.map((photo, index) => {
          return photo.file !== null ? (
            <FeedBox key={index + photo.user.username}>
              <FeedHead>
                {photo.user.avatar ? (
                  <Avatar src={photo.user.avatar} alt={photo.user.username} />
                ) : (
                  <Avatar
                    src="./img/defaultUser.png"
                    alt={photo.user.username}
                  />
                )}
                <Username>{photo.user.username}</Username>
              </FeedHead>
              <FeedPhoto>
                <FeedImg
                  src={photo.file}
                  alt={photo.user.username + "의 이미지"}
                />
              </FeedPhoto>
              <FeedIcon>
                <div>
                  <PhotoAction>
                    <FontAwesomeIcon
                      style={{ color: photo.isLiked ? "red" : "inherit" }}
                      icon={photo.isLiked ? SolidHeart : faHeart}
                    />
                  </PhotoAction>
                  <PhotoAction>
                    <FontAwesomeIcon icon={faComment} />
                  </PhotoAction>
                  <PhotoAction>
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </PhotoAction>
                </div>
                <div>
                  <FontAwesomeIcon icon={faBookmark} />
                </div>
              </FeedIcon>
              {photo.likes == 0 ? null : (
                <Likes>{photo.likes} 명의 좋아요가 있습니다.</Likes>
              )}
              <FeedCaption>
                <span>
                  {photo.caption.length > 25
                    ? `${photo.caption.slice(0, 25)}...`
                    : photo.caption}
                </span>
                <br />
                <SeeDetails>
                  <FatText>자세히보기</FatText>
                </SeeDetails>
              </FeedCaption>
            </FeedBox>
          ) : null;
        })}
      </PhotoContainer>
    </Wrapper>
  );
};

export default Home;
