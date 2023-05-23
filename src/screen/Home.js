import { LogUserOut } from "../apollo";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Home = () => {
  const history = useHistory();
  return (
    <div>
      <h1>home1</h1>
      <button onClick={() => LogUserOut(history)}> logout!</button>
    </div>
  );
};

export default Home;
