import React from "react";
import "./LoginSignup.css";

const LoginSignup = () => {
  return (
    <section>
      {/* Background grid spans */}
      {Array.from({ length: 200 }).map((_, index) => (
        <span key={index}></span>
      ))}

      {/* Sign In Box */}
      <div className="signin">
        <div className="content">
          <h2>Sign In</h2>

          <form className="form">
            <div className="inputBox">
              <input type="text" required />
              <i>Username</i>
            </div>

            <div className="inputBox">
              <input type="password" required />
              <i>Password</i>
            </div>

            <div className="links">
              <a href="#">Forgot Password</a>
            </div>

            <div className="inputBox">
              <input type="submit" value="Login" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginSignup;
