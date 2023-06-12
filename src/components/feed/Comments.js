import React from "react";
//import sanitizeHtml from "sanitize-html";
import { useForm } from "react-hook-form";
import { PropTypes } from "prop-types";
import styled from "styled-components";
import { FeedPadding } from "../shared";
import Comment from "./Comment";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { gql } from "apollo-client-preset";
import { useMutation } from "@apollo/client";
import useUser from "../../hooks/useUser";

const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
      id
    }
  }
`;

const FeedCaption = styled(FeedPadding)`
  color: ${(props) => props.theme.fontColor};
`;
const CommentCaption = styled.span`
  a {
    background-color: inherit;
    color: ${(props) => props.theme.blue};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
const Comments = ({ caption, comments, photoId }) => {
  const { data: userData } = useUser();
  //console.log(photoId, "asdf");
  const { register, handleSubmit, getValues, setValue } = useForm();

  const createCommentUpdate = (cache, result) => {
    const { payload } = getValues();
    setValue("payload", "");
    const {
      data: {
        createComment: { ok, id },
      },
    } = result;

    if (ok && userData?.me) {
      const newComment = {
        __typename: "Comment",
        createdAt: Date.now() + "",
        id,
        isMine: true,
        payload,
        user: {
          ...userData.me,
        },
      };
      const newCacheComment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment BSName on Comment {
            id
            createdAt
            isMine
            payload
            user {
              username
              avatar
            }
          }
        `,
      });
      console.log(newCacheComment);

      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          comments(prev) {
            return [...prev, newCacheComment];
          },
          commentNumber(prev) {
            return prev + 1;
          },
        },
      });
      //console.log(newComment);
    }
  };
  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      update: createCommentUpdate,
    }
  );
  const onValid = (data) => {
    const { payload } = getValues();
    console.log(payload);
    if (loading) {
      return;
    }
    createCommentMutation({
      variables: {
        photoId,
        payload,
      },
    });
  };
  //console.log(comments, "asdfasdfasdf");
  //   console.log(
  //     sanitizeHtml(
  //       caption.replace(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g, "<mark>$&</mark>"),
  //       {
  //         allowedTags: ["mark"],
  //       }
  //     )
  //   );
  //   const cleanedPayload = sanitizeHtml(
  //     caption.replace(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g, "<mark>$&</mark>"),
  //     {
  //       allowedTags: ["mark"],
  //     }
  //   );
  return (
    <div>
      <FeedCaption>
        {/* <span>
          {caption.length > 25 ? `${caption.slice(0, 25)}...` : caption}
        </span> */}
        {/* <CommentCaption
          dangerouslySetInnerHTML={{
            __html: cleanedPayload,
          }}
        ></CommentCaption> */}
        <CommentCaption>
          {caption.split(" ").map((word, index) =>
            /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g.test(word) ? (
              <React.Fragment key={index}>
                <Link to={`/hashtags/${word}`}>{word}</Link>{" "}
              </React.Fragment>
            ) : (
              <React.Fragment key={index}>{word} </React.Fragment>
            )
          )}
        </CommentCaption>
      </FeedCaption>
      {comments.map((comment) => (
        <Comment {...comment} photoId={photoId} key={comment.id} />
      ))}
      <div>
        <form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("payload", {
              required: true,
            })}
            name="payload"
            type="text"
            placeholder="코멘트를 작성해주세요."
          />
          <input type="submit" value="ok" style={{ background: "red" }} />
        </form>
      </div>
    </div>
  );
};

Comments.propTypes = {
  photoId: PropTypes.number,
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
