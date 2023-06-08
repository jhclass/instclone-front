import { PropTypes } from "prop-types";
import styled from "styled-components";
import { FeedPadding } from "../shared";
import Comment from "./Comment";
const FeedCaption = styled(FeedPadding)`
  color: ${(props) => props.theme.fontColor};
`;

const Comments = ({ caption, comments }) => {
  //console.log(comments, "asdfasdfasdf");
  return (
    <div>
      <FeedCaption>
        <span>
          {caption.length > 25 ? `${caption.slice(0, 25)}...` : caption}
        </span>
      </FeedCaption>
      {comments.map((comment, index) => (
        <Comment {...comment} key={`${comment.username}+${index}`} />
      ))}
    </div>
  );
};

Comments.propTypes = {
  caption: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired,
      }),
      payload: PropTypes.string,
      isMine: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ),
};

export default Comments;
