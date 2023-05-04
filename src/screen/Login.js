import { isLoggedInVar } from "../apollo";

const Login = () => {

    return (
        <div>
            <h1>login</h1>
            <button onClick={() => isLoggedInVar(true)}>login plz.</button>
        </div>

    )
}

export default Login;