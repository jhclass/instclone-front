import { isLoggedInVar } from "../apollo";

const Home = () => {
  return (
    <div>
      <h1>home1</h1>
      <button onClick={() => isLoggedInVar(false)}> logout!</button>
    </div>
  );
};

export default Home;
