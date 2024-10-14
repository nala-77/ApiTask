import { useRef, useState } from "react";
// for css
import "./SignUp.css";

// for images
import focalImg from "./../../../public/Group.png";
import upload from "./../../../public/Upload icon.svg";

// components
import Sign from "../Sign/Sign";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  // to get informations
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState<string>("");
  const [lastName, setlastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setrePassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [img, setImg] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message

  const fileInputRef = useRef<HTMLInputElement>(null);

  function signup(event: React.FormEvent) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("user_name", firstName+" "+lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", rePassword);
    if (img) {
      formData.append("profile_image", img);
    }
    

    axios
      .post("https://test1.focal-x.com/api/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const token = res.data.data.token;
        if (token) {
          console.log("User registered successfully! Token stored.");
          localStorage.setItem("token", `Bearer ${token}`);
          localStorage.setItem("img", `${res.data.data.user.profile_image_url}`);
          localStorage.setItem("name", `${res.data.data.user.user_name}`);
        }
        navigate("/dashboard");
      })
      .catch((error) => {
        if (error.response) {
          console.log("Conflict details:", error.response.data);

          const errorMessage = error.response.data.errors
            ? Object.values(error.response.data.errors).flat().join(", ")
            : error.response.data.message;

          setErrorMessage(errorMessage);
        } else {
          console.log("Error:", error.message);
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
      });
  }

  return (
    <main className="main-background SignUp">
      <Sign
        image={focalImg}
        head="Sign Up"
        text="Fill in the following fields to create an account."
        question="Do you have an account?"
        link=" Sign in"
        linkTo="/"
      >
        <form className="sign-form" onSubmit={(event) => signup(event)}>
          <div className="form-input">
            <label>Name</label>
            <div className="input-parent">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={(event) => setfirstName(event.target.value)}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={(event) => setlastName(event.target.value)}
                required
              />
            </div>
          </div>
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
            <div className="input-parent">
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <input
                type="password"
                name="password_confirmation"
                placeholder="Re-enter your password"
                onChange={(event) => setrePassword(event.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label>Profile Image</label>
            <div
              className="imgFile-parent"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                hidden
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    setImg(file);
                    setPreviewUrl(URL.createObjectURL(file));
                  }
                }}
              />
              {previewUrl ? (
                <img src={previewUrl} alt="Selected" className="url-img" />
              ) : (
                <img src={upload} alt="upload img" className="upload" />
              )}
            </div>
          </div>
          <button type="submit" className="sign-btn">
            Sign up
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </Sign>
    </main>
  );
}

export default SignUp;
