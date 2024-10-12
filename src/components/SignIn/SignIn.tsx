import focalImg from "./../../../public/Group.png";
import Sign from "../Sign/Sign";
import "./../Sign/Sign.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function signIn(event: any) {
    event.preventDefault();
    axios
      .post("https://test1.focal-x.com/api/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", `Bearer ${res.data.token}`);
        navigate("/dashboard");
      })
      .catch((error) => console.log(error));
  }
  return (
    <main className="main-background">
      <Sign
        image={focalImg}
        head="Sign In"
        text="Enter your credentials to access your account"
        question="Don’t have an account?"
        link=" Create one"
        linkTo="/signup"
      >
        <form className="sign-form">
          <div className="form-input">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-input">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button className="sign-btn" onClick={(event) => signIn(event)}>
            Sign In
          </button>
        </form>
      </Sign>
    </main>
  );
}

export default SignIn;
