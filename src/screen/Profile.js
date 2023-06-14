import { gql } from "apollo-client-preset";
import { useParams } from "react-router-dom";
import { PHOTO_FRAGMENT } from "./fragment";

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
  console.log(username);
  return <>asdfasdf</>;
};
export default Profile;
