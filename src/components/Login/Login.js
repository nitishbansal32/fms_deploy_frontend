import { useState, useContext } from "react";
import Axios from "axios";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import logo from "../../Images/Logo.jpeg";
import cross from "../../Images/cross.svg";

import LoginImage from "../../../src/Images/signin.svg";

const Login = () => {
  const url = "https://lc-backend-v2.herokuapp.com/api/v1/LC/login";

  // const url = "http://localhost:8000/api/v1/LC/login";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const {
    isLoggedIn,
    setIsLoggedIn,
    setRole,
    modal,
    setModal,
    modalColor,
    setModalColor,
    msg,
    setMsg,
  } = useContext(UserContext);

  const [errMsg, setErrMsg] = useState(false);

  const [waitAuth, setWaitAuth] = useState(false);

  const CrossHandler = () => {
    setErrMsg(false);
    setWaitAuth(false);
  };

  const EmailChange = (e) => {
    setEmail(e.target.value);
    // console.log(email);
  };
  const PasswordChange = (e) => {
    setPassword(e.target.value);
    // console.log(password);
  };
  const headers = {
    "Content-Type": "application/json",
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // setWaitAuth(true);
    setModal(true);
    setMsg("Authenticating user...");
    setModalColor("green");

    localStorage.setItem("email", email);

    Axios.post(
      url,
      {
        email: email,
        password: password,
        // email: `testing@email.com`,
        // password: `123456`,
      },
      headers
    )
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.user.role);
        localStorage.setItem("logo", response.data.user.logo);
        localStorage.setItem("_id", response.data.user.company);
        localStorage.setItem("version", response.data.version);
        // console.log(response.data.version);
        const item = localStorage.getItem("token", response.data.token);
        console.log(response);
        if (response.data == "Too many requests, please try again later.") {
          setModal(true);
          setMsg("Too many requests please try again...");
          setModalColor("red");
        }
        if (response.data.msg === "Invalid Credentials") {
          setModal(true);
          setMsg("Invalid credentials!");
          setModalColor("red");
        } else {
          setModal(true);
          setMsg("User authenticated!");
          setModalColor("green");
        }
        setIsLoggedIn(item);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.msg === "Invalid Credentials") {
          setModal(true);
          setMsg("Invalid credentials!");
          setModalColor("red");
        } else {
          setModal(true);
          setMsg("Please Try again!");
          setModalColor("red");
        }
      });
  }

  setTimeout(() => {
    if (isLoggedIn) {
      navigate("/allservices");
    }
  }, 700);

  return (
    <div className={styles.parent_container}>
      <div className={styles.main_container}>
        <img src={logo} alt="" style={{ width: "30%" }} />

        <div>
          <div className={styles.heading_container}>
            <h1>Sign In</h1>
          </div>

          <form onSubmit={handleSubmit} className={styles.form_container}>
            <div className={styles.input_container}>
              <div className={styles.fields}>
                <label htmlFor="Email">Email</label>
                <input
                  type="text"
                  onChange={EmailChange}
                  value={email}
                  placeholder="Enter Email Address"
                />
              </div>
              <div className={styles.fields}>
                <label htmlFor="Password">Password</label>
                <input
                  type="password"
                  onChange={PasswordChange}
                  value={password}
                  placeholder="Enter Password"
                />
              </div>
              <div className={styles.forget_check_container}></div>
            </div>
            <button>Submit</button>
          </form>
        </div>
      </div>
      <div className={styles.right_container}>
        <img src={LoginImage} alt="" style={{ width: "100%" }} />
      </div>
      {/* {errMsg && (
        <div className={styles.err_msg_container}>
          <p>Invalid Credentials</p>
          <img src={cross} onClick={CrossHandler} alt="" />
        </div>
      )}
      {waitAuth && (
        <div className={styles.wait_msg_container}>
          <p>Authenticating user...</p>
        </div>
      )} */}
    </div>
    // </div>
  );
};

export default Login;
