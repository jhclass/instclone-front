import sanitizeHtml from "sanitize-html";
import { PropTypes } from "prop-types";
import styled from "styled-components";
import { FeedPadding } from "../shared";
import Comment from "./Comment";
const FeedCaption = styled(FeedPadding)`
  color: ${(props) => props.theme.fontColor};
`;
const CommentCaption = styled.span`
  mark {
    background-color: inherit;
    color: ${(props) => props.theme.blue};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
const Comments = ({ caption, comments }) => {
  //console.log(comments, "asdfasdfasdf");
  //   console.log(
  //     sanitizeHtml(
  //       caption.replace(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g, "<mark>$&</mark>"),
  //       {
  //         allowedTags: ["mark"],
  //       }
  //     )
  //   );
  const cleanedPayload = sanitizeHtml(
    caption.replace(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g, "<mark>$&</mark>"),
    {
      allowedTags: ["mark"],
    }
  );
  return (
    <div>
      <FeedCaption>
        {/* <span>
          {caption.length > 25 ? `${caption.slice(0, 25)}...` : caption}
        </span> */}
        <CommentCaption
          dangerouslySetInnerHTML={{
            __html: cleanedPayload,
          }}
        ></CommentCaption>
      </FeedCaption>
      {comments.map((comment, index) => (
        <Comment {...comment} key={comment.id} />
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
