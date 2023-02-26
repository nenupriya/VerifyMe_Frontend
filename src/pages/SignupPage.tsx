import React, { useState, useContext } from "react";
import Logo from "../components/Logo";
import "../styling/UserPage.scss";
import { Link, useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import SignupCard from "../components/SignupCard";

const SignupPage = () => {
  const [warningUsername, setWarningUsername] = useState<boolean>(false);
  const [warningname, setWarningname] = useState<boolean>(false);
  const [warningEmail, setWarningEmail] = useState<boolean>(false);
  const [warningPassword, setWarningPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [first_name, setFirst_name] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loadingScreen, setLoadingScreen] = useState<boolean>(false);
  const { setUserCreated, signupWarning, setSignupWarning } =
    useContext(AuthContext);
  let navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    setWarningUsername(false);
    setWarningname(false);
    setWarningEmail(false);
    setWarningPassword(false);

    if (username && first_name && email && password) {
      e.preventDefault();
      setLoadingScreen(true);

      axios
        .post("https://verifyme.up.railway.app/register/", {
          username,
          first_name,
          email,
          password,
        })
        .then((response) => {
          console.log(response.data);
          setUserCreated(true);
          navigate("/");
        })
        .catch((error) => {
          console.log("Sign up error", error.message);
          setSignupWarning(true);
        })
        .finally(() => {
          setLoadingScreen(false);
        });
    } else if (!username && !email && !first_name && !password) {
      setWarningUsername(true);
      setWarningPassword(true);
      setWarningEmail(true);
      setWarningname(true);
    } else if (!email) {
      setWarningEmail(true);
    } else if (!username) {
      setWarningUsername(true);
    } else if (!first_name) {
      setWarningname(true);
    } else if (!password) {
      setWarningPassword(true);
    }
  };

  return (
    <>
      {loadingScreen ? (
        <LoadingScreen />
      ) : (
        <div className="UserPage__container display__flex">
          <Logo />
          {signupWarning ? <SignupCard /> : ""}
          <form className="UserPage__signin">
            <div className="UserPage__signin-welcome">
              <p>
                Welcome to <span>VerifyME</span>
              </p>
            </div>
            <div className="UserPage__signin-signin">
              <h1>Sign up</h1>
            </div>
            <div className="UserPage__signup-up">
              <div className="UserPage__signin-username">
                {warningEmail ? (
                  <p style={{ color: "red" }}>Enter your email address</p>
                ) : (
                  <p>Enter your email address</p>
                )}
                {warningEmail ? (
                  <input
                    style={{ border: "1px solid red" }}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                ) : (
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                )}
              </div>
              <div className="UserPage__signup_username_name">
                <div className="UserPage__signin-username">
                  {warningUsername ? (
                    <p style={{ color: "red" }}>Enter you username</p>
                  ) : (
                    <p>Enter you username</p>
                  )}
                  {warningUsername ? (
                    <input
                      style={{ border: "1px solid red" }}
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  )}
                </div>
                <div className="UserPage__signin-username">
                  {warningname ? (
                    <p style={{ color: "red" }}>Enter you name</p>
                  ) : (
                    <p>Enter you name</p>
                  )}
                  {warningname ? (
                    <input
                      style={{ border: "1px solid red" }}
                      type="text"
                      placeholder="Name"
                      value={first_name}
                      onChange={(e) => setFirst_name(e.target.value)}
                      required
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="Name"
                      value={first_name}
                      onChange={(e) => setFirst_name(e.target.value)}
                      required
                    />
                  )}
                </div>
              </div>
              <div className="UserPage__signin-password">
                {warningPassword ? (
                  <p style={{ color: "red" }}>Enter your password</p>
                ) : (
                  <p>Enter your password</p>
                )}
                {warningPassword ? (
                  <input
                    style={{ border: "1px solid red" }}
                    type="password"
                    placeholder="Password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                ) : (
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    value={password} 
                    required
                  />
                )}
              </div>
            </div>
            <div className="UserPage__login-button">
              <button type="submit" onClick={handleSignup}>
                Sign un
              </button>
            </div>
            <div className="UserPage__link-signin">
              <p>Have an Account?</p>
              <Link to="/login">Sign in</Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default SignupPage;
