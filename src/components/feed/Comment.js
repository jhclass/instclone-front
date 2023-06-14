import { PropTypes } from "prop-types";
import styled from "styled-components";
import { FeedPadding, FatText, SmallText } from "../shared";
import { gql } from "apollo-client-preset";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom/cjs/react-router-dom";
const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComent($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

const FeedComments = styled(FeedPadding)`
  color: ${(props) => props.theme.fontColor};
`;

const changedTime = (createdAt) => {
  const date = new Date(createdAt);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1을 해줍니다.
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분 ${seconds}초 작성됨.`;
};
const Comment = ({ user, payload, createdAt, id, isMine, photoId }) => {
  //console.log(isMine);
  const updateMutation = (cache, result) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;
    if (ok) {
      console.log(photoId);
      cache.evict({ id: `Comment:${id}` });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentNumber(prev) {
            return prev - 1;
          },
        },
      });
    }
  };
  const [deleteComentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      id,
    },
    update: updateMutation,
  });
  const onDeleteClick = () => {
    deleteComentMutation();
  };
  return (
    <FeedComments>
      <div>
        <FatText>
          <Link to={`/user/${user.username}`}>{user.username} &nbsp;</Link>
        </FatText>
        <span>
          {payload.length > 25 ? `${payload.slice(0, 25)}...` : payload}
        </span>
        <br />
        <SmallText style={{ marginTop: "5px", display: "inline-block" }}>
          {changedTime(Number(createdAt))}
        </SmallText>
        {isMine ? <button onClick={onDeleteClick}>삭제</button> : null}
      </div>
      <div></div> {/** 대댓글 */}
    </FeedComments>
  );
};

Comment.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }),
  payload: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  isMine: PropTypes.bool.isRequired,
  photoId: PropTypes.number.isRequired,
};

export default Comment;
