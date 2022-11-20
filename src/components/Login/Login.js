import { useState } from "react";
import Axios from "axios";
import styles from "./Login.module.css";

const Login = () => {
    const url =
        "https://logictics-coordinators-backend.herokuapp.com/api/v1/LC/login";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                console.log(response.data.token);
                console.log(response);
                localStorage.setItem("token", response.data.token);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className={styles.main_container}>
            <form
                action=""
                onSubmit={handleSubmit}
                className={styles.form_container}
            >
                <div className={styles.input_container}>
                    <div>
                        <label htmlFor="Email">Email</label>
                        <input
                            type="text"
                            onChange={EmailChange}
                            value={email}
                        />
                    </div>
                    <div>
                        <label htmlFor="Password">Password</label>
                        <input
                            type="text"
                            onChange={PasswordChange}
                            value={password}
                        />
                    </div>
                </div>
                <button>Submit</button>
            </form>
        </div>
    );
};

export default Login;
