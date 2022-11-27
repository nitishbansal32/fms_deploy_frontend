import styles from "./Accident.module.css";
import Axios from "axios";
import { useState, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import Permission from "../../components/Permission/Permission";

import { UserContext } from "../../UserContext";

const Inventory = () => {
    const [allaccidents, setAllaccidents] = useState("");

    const [accidents, setaccidents] = useState("");

    const { isLoggedIn, setIsLoggedIn, role } = useContext(UserContext);

    const [url, setUrl] = useState("");

    const inputChange = (e) => {
        setaccidents(e.target.value);
    };

    const config = {
        // params: { unit: 277454 },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    // console.log(config.headers);

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.get(
            `https://lc-backend-v2.herokuapp.com/api/v1/LC/accidents/${accidents}`,
            config
        )
            .then((response) => {
                setAllaccidents([response.data.accident]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getAllaccidents = () => {
        if (role === "super-admin") {
            setUrl("");
        } else {
            setUrl("currAccidents");
        }
        Axios.get(
            `https://lc-backend-v2.herokuapp.com/api/v1/LC/accidents/${url}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        )
            .then((response) => {
                console.log(response.data.accidents);
                setAllaccidents(response.data.accidents);
            })
            .catch((err) => {
                console.log(err);
            });

        setAllaccidents("");
    };

    return (
        <>
            {/* {!(isLoggedIn === null) ? ( */}
            <div className="wrapper_container">
                <Navbar />
                <div className={styles.main_container}>
                    <button onClick={getAllaccidents}>Get All accidents</button>
                    <form onSubmit={handleSubmit} action="">
                        <div className={styles.form_input_label}>
                            <input
                                type="text"
                                placeholder="Enter accidents"
                                onChange={inputChange}
                                value={accidents}
                            />
                            <button>Get Info</button>
                        </div>
                    </form>
                    <div className={styles.table_wrapper_container}>
                        <h1>Accidents Information</h1>
                        <div className={styles.table_container}>
                            {allaccidents &&
                                allaccidents.map((item) => (
                                    <div
                                        className={
                                            styles.table_fields_container
                                        }
                                        key={item.driver_licene_number}
                                    >
                                        {/* <div
                                            className={styles.table_identifier}
                                        >
                                            <p>
                                                Accident Date:
                                                {item.accident_date}
                                            </p>
                                        </div> */}
                                        <div
                                            className={styles.table_identifier}
                                        >
                                            <p>
                                                Accident Number:{" "}
                                                {item.accident_number}
                                            </p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>
                                                Accident Time:{" "}
                                                {item.accident_time}
                                            </p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>
                                                Driver Name: {item.driver_name}
                                            </p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>
                                                Driver licence number:{" "}
                                                {item.driver_licene_number}
                                            </p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>
                                                Tractor number:{" "}
                                                {item.tractor_number}
                                            </p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>Location: {item.location}</p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>
                                                Accident type:{" "}
                                                {item.accident_type}
                                            </p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>Damage: {item.damage}</p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>Towing: {item.towing}</p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>
                                                Police report number:{" "}
                                                {item.police_report_number}
                                            </p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>
                                                Police Officer:{" "}
                                                {item.police_officer}
                                            </p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>
                                                Driver charged:{" "}
                                                {item.driver_charged}
                                            </p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>
                                                Action taken:{" "}
                                                {item.action_taken}
                                            </p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>
                                                Preventable: {item.preventable}
                                            </p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>Const: {item.const}</p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>Comments: {item.comments}</p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>
                                                Driver statement:{" "}
                                                {item.driver_statement}
                                            </p>
                                        </div>
                                        <br />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            // ) : ( // <Permission />
            // )}
        </>
    );
};

export default Inventory;
