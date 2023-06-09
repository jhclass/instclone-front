import { PropTypes } from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom/cjs/react-router-dom";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";

import { FatText } from "../shared";
import Avatar from "../Auth/Avartar";
import { gql } from "apollo-client-preset";
import { useMutation } from "@apollo/client";
import { FeedPadding } from "../shared";
import Comments from "./Comments";
const FeedBox = styled.div`
  padding: 0px;
  width: 100%;
  max-width: 610px;
  margin: 10px;
  border: 1px solid ${(props) => props.theme.borderColor};
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

const SeeDetails = styled.span`
  display: inline-block;
  margin-top: 20px;
  cursor: pointer;
  font-size: 12px;
  color: ${(props) => props.theme.fontColor};
  padding-bottom: 10px;
  opacity: 0.7;
`;
const PhotoAction = styled.div`
  margin-right: 20px;
  cursor: pointer;
`;
const Likes = styled(FatText)`
  display: block;
  margin-bottom: 10px;
  color: #ff5252;
`;
const CommentCount = styled(FeedPadding)`
  opacity: 0.7;
  font-size: 12px;
  margin-top: 10px;
`;
const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const Photo = ({
  id,
  username,
  avatar,
  file,
  isLiked,
  likes,
  caption,
  commentNumber,
  comments,
}) => {
  // const datachk = (data) => {
  //   console.log(data, "datachk");
  // };
  //console.log(comments[0]?.createdAt, "전달전달");

  const updateToggleLike = (cache, result) => {
    console.log(cache, result);
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;
    //console.log(ok);
    if (ok) {
      //console.log("toggleLike 가 제대로 동작함.");
      //console.log(likes, isLiked);
      const fragmentId = `Photo:${id}`;
      cache.modify({
        id: fragmentId,
        fields: {
          isLiked(prev) {
            return !prev;
          },
          likes(prev) {
            if (isLiked) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
      // const fragment = gql`
      //   fragment BSName on Photo {
      //     isLiked
      //     likes
      //   }
      // `;
      // Photo 컴포넌트안에 arg 가 없어도 readFragment 를 통해서 불러올수 있어
      // const result = cache.readFragment({
      //   id: fragmentId,
      //   fragment: fragment,
      // });
      // console.log(result);
      // cache.writeFragment({
      //   id: fragmentId,
      //   fragment: fragment,
      //   data: {
      //     isLiked: !isLiked,
      //     likes: isLiked ? likes - 1 : likes + 1,
      //   },
      // });
    }
    //console.log(likes, isLiked);
  };
  const [toggleLikes] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id: id,
    },
    //onCompleted: datachk,
    //refetchQueries: [{ query: FEED_QUERY }],
    update: updateToggleLike,
  });
  //console.log(toggleLikeMutation);
  return file !== null ? (
    <FeedBox>
      <FeedHead>
        <Link to={`/user/${username}`}>
          {avatar ? (
            <Avatar src={avatar} alt={username} />
          ) : (
            <Avatar src="./img/defaultUser.png" alt={username} />
          )}
        </Link>
        <Username>
          <Link to={`/user/${username}`}>{username}</Link>
        </Username>
      </FeedHead>
      <FeedPhoto>
        <FeedImg src={file} alt={username + "의 이미지"} />
      </FeedPhoto>
      <div style={{ padding: "0 10px" }}>
        <FeedIcon>
          <div>
            <PhotoAction onClick={toggleLikes}>
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
        {likes === 0 ? null : <Likes>{likes} 명의 좋아요가 있습니다.</Likes>}
        <Comments caption={caption} comments={comments} photoId={id} />

        {commentNumber === 0 ? null : (
          <CommentCount>{`${commentNumber} 개의 댓글`}</CommentCount>
        )}

        <SeeDetails>
          <FatText>자세히보기</FatText>
        </SeeDetails>
      </div>
    </FeedBox>
  ) : null;
};
Photo.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  file: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  caption: PropTypes.string.isRequired,
  commentNumber: PropTypes.number.isRequired,
};

export default Photo;
