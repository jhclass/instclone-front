import { gql } from "apollo-client-preset";
import { useParams } from "react-router-dom";
import { PHOTO_FRAGMENT } from "./fragment";
import { useQuery } from "@apollo/client";

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

const Profile = () => {
  const { username } = useParams();
  const { data } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username,
    },
  });

  //console.log(data);
  return <>asdfasdf</>;
};
export default Profile;
