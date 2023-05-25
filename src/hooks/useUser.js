import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { LogUserOut, isLoggedInVar } from "../apollo";
import { useEffect } from "react";

const ME_QUERY = gql`
  query me {
    me {
      username
      avatar
    }
  }
`;
//token 이 변경되었거나 없다면 로그아웃
const useUser = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  console.log(hasToken);
  const { data, error } = useQuery(ME_QUERY, {
    skip: !hasToken, //false 라면
  });
  useEffect(() => {
    if (data?.me === null) {
      //console.log("there is data", data);
      LogUserOut();
    }
  }, [data]);

  return;
};

export default useUser;
