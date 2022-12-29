import { useState, useContext } from "react";
import Axios from "axios";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import logo from "../../Images/Logo.jpeg";

import LoginImage from "../../../src/Images/signin.svg";

const Login = () => {
  const url = "https://lc-backend-v2.herokuapp.com/api/v1/LC/login";

  // const url = "http://localhost:8000/api/v1/LC/login";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn, setRole } = useContext(UserContext);

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
    try {
      Axios.post(
        url,
        {
          // email: email,
          // password: password,
          email: `testing@email.com`,
          password: `123456`,
        },
        headers
      )
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          const item = localStorage.getItem("token", response.data.token);
          console.log(response.data.user.role);
          const roleValue = response.data.user.role;
          if (roleValue === "super-admin") {
            setRole(true);
          } else {
            setRole(false);
          }
          setIsLoggedIn(item);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (exp) {
      console.log(exp);
    }

    console.log(isLoggedIn);
  }

  setTimeout(() => {
    if (isLoggedIn) {
      navigate("/allservices");
    }
  }, 700);

  return (
    // <div className="wrapper_container">
    //     <Navbar />
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
                  type="text"
                  onChange={PasswordChange}
                  value={password}
                  placeholder="Enter Password"
                />
              </div>
              <div className={styles.forget_check_container}>
                {/* <div className={styles.checkbox}>
                                <label htmlFor="remember me">Remember me</label>
                                <input name="remember me" type="checkbox" />
                            </div> */}
                {/* <button>Forget Password?</button> */}
              </div>
            </div>
            {/* <Link to={isLoggedIn ? "/" : "/login"}> */}
            <button>Submit</button>
            {/* </Link> */}
            {/* <button onClick={navigateTo}>Navigate to </button> */}
          </form>
        </div>
      </div>
      <div className={styles.right_container}>
        <img src={LoginImage} alt="" style={{ width: "100%" }} />
      </div>
    </div>
    // </div>
  );
};

export default Login;
