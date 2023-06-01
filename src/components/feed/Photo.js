import { PropTypes } from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";

import { FatText } from "../shared";
import Avatar from "../Auth/Avartar";
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

const Photo = ({ key, username, avatar, file, isLiked, likes, caption }) => {
  return file !== null ? (
    <FeedBox key={key}>
      <FeedHead>
        {avatar ? (
          <Avatar src={avatar} alt={username} />
        ) : (
          <Avatar src="./img/defaultUser.png" alt={username} />
        )}
        <Username>{username}</Username>
      </FeedHead>
      <FeedPhoto>
        <FeedImg src={file} alt={username + "의 이미지"} />
      </FeedPhoto>
      <FeedIcon>
        <div>
          <PhotoAction>
            <FontAwesomeIcon
              style={{ color: isLiked ? "red" : "inherit" }}
              icon={isLiked ? SolidHeart : faHeart}
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
      {likes == 0 ? null : <Likes>{likes} 명의 좋아요가 있습니다.</Likes>}
      <FeedCaption>
        <span>
          {caption.length > 25 ? `${caption.slice(0, 25)}...` : caption}
        </span>
        <br />
        <SeeDetails>
          <FatText>자세히보기</FatText>
        </SeeDetails>
      </FeedCaption>
    </FeedBox>
  ) : null;
};
Photo.propTypes = {
  key: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  file: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  caption: PropTypes.string.isRequired,
};

export default Photo;
