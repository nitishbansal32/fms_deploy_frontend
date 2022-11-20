import styles from "./Accident.module.css";

import Axios from "axios";
import { useState } from "react";

const Accident = () => {
    const [accident, setAccident] = useState("");
    console.log(accident);

    const inputChange = (e) => {
        e.preventDefault();
        setAccident(e.target.value);
    };
    const customConfig = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:8000/accidents", {
            driver_name: accident,
        })
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter Accident"
                onChange={inputChange}
                value={accident}
            />
            <button>Get Info</button>
        </form>
    );
};

export default Accident;
