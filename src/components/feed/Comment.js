import { PropTypes } from "prop-types";
import styled from "styled-components";
import { FeedPadding, FatText, SmallText } from "../shared";

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
const Comment = ({ user, payload, createdAt }) => {
  return (
    <FeedComments>
      <div>
        <FatText>{user.username} &nbsp;</FatText>
        <span>
          {payload.length > 25 ? `${payload.slice(0, 25)}...` : payload}
        </span>
        <br />
        <SmallText style={{ marginTop: "5px", display: "inline-block" }}>
          {changedTime(Number(createdAt))}
        </SmallText>
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
};

export default Comment;
