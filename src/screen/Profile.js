import { useParams } from "react-router-dom";

const Profile = () => {
  const { username } = useParams();
  console.log(username);
  return <>asdfasdf</>;
};
export default Profile;
