import styles from "./Drivers.module.css";

import Axios from "axios";
import { useState } from "react";

const Drivers = () => {
    const url = "http://localhost:8000/drivers";
    const [drivers, setDrivers] = useState("");

    const inputChange = (e) => {
        setDrivers(e.target.value);
    };

    const handleSubmit = () => {
        Axios.post(url, {
            employee_name: drivers,
        })
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <form onSubmit={handleSubmit} action="" onSubmit>
            <input
                type="text"
                placeholder="Enter Driver Name"
                onChange={inputChange}
                value={drivers}
            />
            <button>Get Info</button>
        </form>
    );
};

export default Drivers;
