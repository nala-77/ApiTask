import "./../Sign/Sign.css";

import Sign from "../Sign/Sign";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// for images
import focalImg from "./../../../public/Group.png";


function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const navigate = useNavigate();

  function signIn(event: React.FormEvent) {
    event.preventDefault();
    axios
      .post("https://test1.focal-x.com/api/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log("API Response:", res)

        if (res.data) {
          const token = res.data.token
          const profileImageUrl = res.data.user.profile_image_url
          const userName = res.data.user.user_name

          if (token) {
            console.log("User logged in successfully! Token stored.")
            localStorage.setItem("token", `Bearer ${token}`)
            localStorage.setItem("img", profileImageUrl || "default_image_url")
            localStorage.setItem("name", userName || "User")
            navigate("/dashboard");
          }
        } else {
          console.error("Unexpected response structure:", res.data)
          setErrorMessage("Login failed: Unexpected response from server.");
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log("Error details:", error.response.data);
          const errorMessage =
            error.response.data.message || "Login failed. Please try again.";
          setErrorMessage(errorMessage);
        } else {
          console.log("Error:", error.message);
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
      });
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
        <form className="sign-form" onSubmit={signIn}>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="form-input">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="form-input">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <button className="sign-btn" type="submit">
            Sign In
          </button>
        </form>
      </Sign>
    </main>
  );
}

export default SignIn;
