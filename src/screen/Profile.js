import { gql } from "apollo-client-preset";
import { useParams } from "react-router-dom";
import { PHOTO_FRAGMENT } from "./fragment";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { FatText } from "../components/shared";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RegButton from "../components/Auth/RegButton";
import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import useUser from "../hooks/useUser";
const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      firstName
      lastName
      username

      bio
      avatar
      totalFollowing
      totalFollower
      isMe
      isFollowing
      photos {
        ...PhotoFragment
      }
    }
  }
  ${PHOTO_FRAGMENT}
`;

const FOLLOW_USER_MUTATION = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
    }
  }
`;

const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
`;
const Avatar = styled.div`
  margin-left: 0px;
  height: 130px;
  width: 130px;
  border-radius: 100%;
  margin-right: 20px;

  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`;
const Column = styled.div``;
const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;
const Row = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
`;
const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  margin-right: 20px;
`;
const Value = styled(FatText)`
  font-size: 18px;
`;
const Name = styled(FatText)`
  font-size: 20px;
`;

const Grid = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-top: 50px;
`;

const Photo = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  position: relative;
  width: 100%;
  padding-top: 100%;
`;

const Icons = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

const RegButtons = styled(RegButton).attrs({
  as: "button",
})`
  margin-left: 10px;
  border: 0;
`;

const Profile = () => {
  const { username } = useParams();
  const { data: userData } = useUser();
  //update로만 캐시에 접근할 수 있는 것은 아니다. useAolloClient()를 사용하고 client 에 있는 캐시를 불러올 수 있다는 말이지
  const client = useApolloClient();
  //console.log(userData?.me?.username);
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username,
    },
  });
  //console.log(data);

  const unfollowUserUpdate = (cache, result) => {
    //console.log(result, "result");
    const {
      data: {
        unfollowUser: { ok },
      },
    } = result;
    if (!ok) {
      return;
    }
    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing(prev) {
          return false;
        },
        totalFollower(prev) {
          return prev - 1;
        },
      },
    });
    const { me } = userData;
    cache.modify({
      id: `User:${me.username}`,
      fields: {
        totalFollowing(prev) {
          return prev - 1;
        },
      },
    });
  };

  const followUserCompleted = (data) => {
    console.log(data);
    const {
      followUser: { ok },
    } = data;
    if (!ok) {
      return;
    }
    //useApolloClien() 를 사용하면 어디서든 cache 를 불러올수 있지.
    const { cache } = client;
    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing(prev) {
          return true;
        },
        totalFollower(prev) {
          return prev + 1;
        },
      },
    });
    const { me } = userData;
    cache.modify({
      id: `User:${me.username}`,
      fields: {
        totalFollowing(prev) {
          return prev + 1;
        },
      },
    });
  };
  const [unfollowUser] = useMutation(UNFOLLOW_USER_MUTATION, {
    variables: {
      username,
    },
    update: unfollowUserUpdate,
  });

  const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
    variables: {
      username,
    },
    onCompleted: followUserCompleted,
  });
  //console.log(data);
  const getButton = (data) => {
    const {
      seeProfile: { isMe, isFollowing },
    } = data;
    //console.log(isFollowing);
    if (isMe) {
      return <RegButtons>Edit Profile</RegButtons>;
    }
    if (isFollowing) {
      return <RegButtons onClick={unfollowUser}>Unfollow</RegButtons>;
    } else {
      return <RegButtons onClick={followUser}>Follower</RegButtons>;
    }
  };
  return (
    <div>
      <PageTitle
        title={
          loading ? "...Loading" : `${data?.seeProfile?.username} 의 프로필`
        }
      />
      <Header>
        <Avatar bg={data?.seeProfile?.avatar} />
        <Column>
          <Row>
            <Username>{data?.seeProfile?.username}</Username>
            {data?.seeProfile ? getButton(data) : null}
          </Row>
          <Row>
            <List>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollower}</Value> followers
                </span>
              </Item>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowing}</Value> following
                </span>
              </Item>
            </List>
          </Row>
          <Row>
            <Name>
              {data?.seeProfile?.firstName}
              {"  "}
              {data?.seeProfile?.lastName}
            </Name>
          </Row>
          <Row>{data?.seeProfile?.bio}</Row>
        </Column>
      </Header>
      <Grid>
        {data?.seeProfile?.photos?.map((photo) => (
          <Photo bg={photo.file} key={photo.id}>
            <Icons>
              <Icon>
                <FontAwesomeIcon icon={faHeart} />
                {photo.likes}
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faComment} />
                {photo.commentNumber}
              </Icon>
            </Icons>
          </Photo>
        ))}
      </Grid>
    </div>
  );
};
export default Profile;
