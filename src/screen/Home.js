import { LogUserOut } from "../apollo";

const Home = () => {
  return (
    <div>
      <h1>home1</h1>
      <button onClick={LogUserOut}> logout!</button>
    </div>
  );
};

export default Home;
