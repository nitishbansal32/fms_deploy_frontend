import { Link, Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import styles from "./Dashboard.module.css";
import Navbar from "../../components/Navbar/Navbar";

import { UserContext } from "../../UserContext";

const Dashboard = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

    return (
        <>
            {isLoggedIn ? (
                <div className="wrapper_container">
                    <Navbar />
                    <div className={styles.container}>
                        <div>
                            <h1>Inventory</h1>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s, when an unknown printer took a galley
                                of type and scrambled it to make a type specimen
                                book. It has survived not only five centuries,
                                but also the leap into electronic typesetting,
                                remaining essentially unchanged.
                            </p>
                        </div>

                        <div>
                            <h1>Drivers</h1>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s, when an unknown printer took a galley
                                of type and scrambled it to make a type specimen
                                book. It has survived not only five centuries,
                                but also the leap into electronic typesetting,
                                remaining essentially unchanged.
                            </p>
                        </div>

                        <div>
                            <h1>Accident</h1>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s, when an unknown printer took a galley
                                of type and scrambled it to make a type specimen
                                book. It has survived not only five centuries,
                                but also the leap into electronic typesetting,
                                remaining essentially unchanged.
                            </p>
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
    // }
};

export default Dashboard;
