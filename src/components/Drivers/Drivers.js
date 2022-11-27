import styles from "./Drivers.module.css";
import Axios from "axios";
import { useState, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";

import { UserContext } from "../../UserContext";

const Inventory = () => {
    const [alldrivers, setAlldrivers] = useState("");

    const [drivers, setdrivers] = useState("");

    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

    const inputChange = (e) => {
        setdrivers(e.target.value);
    };

    const config = {
        // params: { unit: 277454 },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    console.log(config.headers);

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.get(
            `https://lc-backend-v2.herokuapp.com/api/v1/LC/drivers/${drivers}`,
            config
        )
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getAlldrivers = () => {
        Axios.get(`https://lc-backend-v2.herokuapp.com/api/v1/LC/drivers`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((response) => {
                console.log(response.data.drivers);
                setAlldrivers(response.data.drivers);
            })
            .catch((err) => {
                console.log(err);
            });

        setAlldrivers("");
    };

    return (
        <>
            {isLoggedIn ? (
                <div className="wrapper_container">
                    <Navbar />
                    <div className={styles.main_container}>
                        <button onClick={getAlldrivers}>Get All drivers</button>
                        <form onSubmit={handleSubmit} action="">
                            <input
                                type="text"
                                placeholder="Enter drivers"
                                onChange={inputChange}
                                value={drivers}
                            />
                            <button>Get Info</button>
                        </form>
                        <div className={styles.table_wrapper_container}>
                            <h1>Drivers Information</h1>
                            {alldrivers ? (
                                alldrivers.map((item) => (
                                    <div
                                        className={styles.table_container}
                                        key={item.employee_id}
                                    >
                                        <div
                                            className={styles.table_identifier}
                                        >
                                            <p>
                                                Employee Name{" "}
                                                {item.employee_name}
                                            </p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>Start Date: {item.start_date}</p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>
                                                Employee ID: {item.employee_id}
                                            </p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>
                                                Medical Expiry Date:{" "}
                                                {item.medical_expiry_date}
                                            </p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>Terminal: {item.terminal}</p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>Shift: {item.shift}</p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>
                                                Employee Type:{" "}
                                                {item.employee_type}
                                            </p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>
                                                Employee Status:{" "}
                                                {item.employee_status}
                                            </p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>
                                                Number of Axles:{" "}
                                                {item.number_of_axles}
                                            </p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>
                                                Phone Number:{" "}
                                                {item.phone_number}
                                            </p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>
                                                Emergency Contact:{" "}
                                                {item.emergency_contact}
                                            </p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>Supervisor: {item.supervisor}</p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>
                                                Supervisor Notes:{" "}
                                                {item.supervisor_notes}
                                            </p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>
                                                CVOR Points: {item.CVOR_points}
                                            </p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>
                                                Employee Notes:{" "}
                                                {item.employee_notes}
                                            </p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>Other: {item.other}</p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>
                                                Accidents and citations:{" "}
                                                {item.accidents_and_citations}
                                            </p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>First PR: {item.first_PR}</p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>
                                                Semi Annual PR:{" "}
                                                {item.semi_annual_PR}
                                            </p>
                                        </div>
                                        <br />
                                    </div>
                                ))
                            ) : (
                                <span>None</span>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="not_logged_in">
                    <h1>Click below to SignIn</h1>
                    <Link to="/login">
                        <button>Sign In</button>
                    </Link>
                </div>
            )}
        </>
    );
};

export default Inventory;
