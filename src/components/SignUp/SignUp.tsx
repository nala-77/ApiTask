// for css
import "./SignUp.css";

// for images
import focalImg from "./../../../public/Group.png";
import upload from "./../../../public/Upload icon.svg";

// components
import Sign from "../Sign/Sign";

function SignUp() {
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
        <form className="sign-form">
          <div className="form-input">
            <label>Name</label>
            <div className="input-parent">
              <input type="text" name="firstName" placeholder="First Name" />
              <input type="text" name="lastName" placeholder="Last Name" />
            </div>
          </div>
          <div className="form-input">
            <label>Email</label>
            <input type="email" name="email" placeholder="Enter your email" />
          </div>
          <div className="form-input">
            <label>Password</label>
            <div className="input-parent">
              <input
                type="password"
                name="password"
                placeholder="Enter password"
              />
              <input
                type="password"
                name="password"
                placeholder="Re-enter your password"
              />
            </div>
          </div>

          <div>
            <label>Profile Image</label>
            <div
              className="imgFile-parent"
              onClick={() => document.querySelector(".file-img").click()}
            >
              <input type="file" className="file-img" hidden />
              <img src={upload} alt="upload img" />
            </div>
          </div>
          <button className="sign-btn">Sign up</button>
        </form>
      </Sign>
    </main>
  );
}

export default SignUp;
