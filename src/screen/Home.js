import { LogUserOut } from "../apollo";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useQuery, gql } from "@apollo/client";

import styled from "styled-components";
import { Wrapper } from "../styles";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";

const PhotoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
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
      <PageTitle title="Home" />
      <h1>home1</h1>
      <button onClick={() => LogUserOut(history)}> logout!</button>
      <PhotoContainer>
        {data?.seeFeed?.map((photo) => (
          <Photo
            key={photo.id}
            username={photo.user.username}
            file={photo.file}
            isLiked={photo.isLiked}
            avatar={photo.user.avatar}
            likes={photo.likes}
            caption={photo.caption}
            id={photo.id}
          />
        ))}
      </PhotoContainer>
    </Wrapper>
  );
};

export default Home;
