import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import styles from "./Login.module.css";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../UserContext";

import Navbar from "../../components/Navbar/Navbar";

const Login = () => {
    const url = "https://lc-backend-v2.herokuapp.com/api/v1/LC/login";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

    const EmailChange = (e) => {
        setEmail(e.target.value);
        // console.log(email);
    };
    const PasswordChange = (e) => {
        setPassword(e.target.value);
        // console.log(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post(url, {
            email: `${email}`,
            password: password,
        })
            .then((response) => {
                // console.log(response.data.token);
                // console.log(response.status);
                console.log(response);
                localStorage.setItem("token", response.data.token);
                // setStatus(response.status);
                setIsLoggedIn(true);
            })
            .catch((err) => {
                // localStorage.setItem("authenticated", false);
                console.log(err);
                // setIsLoggedIn(false);
            });

        // console.log(isLoggedIn);
    };

    setTimeout(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, 700);

    return (
        // <div className="wrapper_container">
        //     <Navbar />
        <div className={styles.parent_container}>
            <div className={styles.main_container}>
                <div className={styles.heading_container}>
                    <h1>Sign In</h1>
                    {/* <div className={styles.heading_content_container}>
                        <p>If you don't have an account register</p>
                        <p>
                            You can <a href="">Register here!</a>{" "}
                        </p>
                    </div> */}
                </div>

                <form
                    action=""
                    onSubmit={handleSubmit}
                    className={styles.form_container}
                >
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
                            <button>Forget Password?</button>
                        </div>
                    </div>
                    {/* <Link to={isLoggedIn ? "/" : "/login"}> */}
                    <button>Submit</button>
                    {/* </Link> */}
                    {/* <button onClick={navigateTo}>Navigate to </button> */}
                </form>
            </div>
        </div>
        // </div>
    );
};

export default Login;
