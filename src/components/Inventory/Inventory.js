import styles from "./Inventory.module.css";
import Axios from "axios";
import { useState, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Permission from "../../components/Permission/Permission";

import { Link } from "react-router-dom";

import { UserContext } from "../../UserContext";

const Inventory = () => {
    const [alltractors, setAllTractors] = useState(); //For Displaying infor

    const [tractor, setTractor] = useState(""); //Url For displaying data according to user input

    const [url, setUrl] = useState(""); //For changing getalltractors according to super admin or admin

    const { isLoggedIn, setIsLoggedIn, role, setRole } =
        useContext(UserContext); //Using context API to manage state across application

    // console.log(isLoggedIn);
    const inputChange = (e) => {
        setTractor(e.target.value);
    };

    const config = {
        // params: { unit: 277454 },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    // console.log(config.headers);

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.get(
            `https://lc-backend-v2.herokuapp.com/api/v1/LC/tractors/${tractor}`,
            config
        )
            .then((response) => {
                console.log(response);
                setAllTractors([response.data.tractor]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // console.log(role);

    const getAllTractors = () => {
        if (role === "super-admin") {
            setUrl("");
        } else {
            setUrl("currTractors");
        }
        Axios.get(
            `https://lc-backend-v2.herokuapp.com/api/v1/LC/tractors/${url}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        )
            .then((response) => {
                console.log(response);

                // setAllTractors((prevState) => ({
                //     ...prevState,
                //     ...response.data.tractors,
                // }));
                setAllTractors(response.data.tractors);
            })
            .catch((err) => {
                console.log(err);
            });

        setAllTractors("");
    };

    // console.log(alltractors);

    return (
        <>
            {/* {isLoggedIn ? ( */}
            <div className="wrapper_container">
                <Navbar />
                <div className={styles.main_container}>
                    <button onClick={getAllTractors}>Get All Tractors</button>
                    <form onSubmit={handleSubmit} action="">
                        <div className={styles.form_input_label}>
                            <input
                                type="text"
                                placeholder="Enter tractor"
                                onChange={inputChange}
                                value={tractor}
                            />
                            <button>Get Info</button>
                        </div>
                    </form>
                    <div className={styles.table_wrapper_container}>
                        <h1>Tractor Information</h1>
                        <div className={styles.table_container}>
                            {alltractors &&
                                alltractors.map((item) => (
                                    <div
                                        className={
                                            styles.table_fields_container
                                        }
                                        key={item.unit}
                                    >
                                        <div
                                            className={styles.table_identifier}
                                        >
                                            <p>Unit No: {item.unit}</p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>Year: {item.year}</p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>Made by: {item.made_by}</p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>Color: {item.color}</p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>
                                                Description: {item.description}
                                            </p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>VIN: {item.VIN}</p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>Ownership: {item.ownership}</p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>
                                                Licence Plate:{" "}
                                                {item.licence_plate}
                                            </p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>
                                                Number of Axles:{" "}
                                                {item.number_of_axles}
                                            </p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>Weight: {item.weight}</p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>
                                                Standard Job:{" "}
                                                {item.standard_job}
                                            </p>
                                        </div>
                                        <div className={styles.table_content}>
                                            <p>Status: {item.status}</p>
                                        </div>
                                        <br />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* ) : (
                <Permission />
            )} */}
        </>
    );
};

export default Inventory;
