import styles from "./Inventory.module.css";
import Axios from "axios";
import { useState } from "react";

const Inventory = () => {
    const [alltractors, setAllTractors] = useState("");
    // const unit = 277454;
    const [tractor, setTractor] = useState("");
    // const url = ;

    const inputChange = (e) => {
        setTractor(e.target.value);
    };

    const config = {
        // params: { unit: 277454 },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.get(
            `https://logictics-coordinators-backend.herokuapp.com/api/v1/LC/tractors/${tractor}`,
            config
        )
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getAllTractors = () => {
        Axios.get(
            `https://logictics-coordinators-backend.herokuapp.com/api/v1/LC/tractors`,
            config
        )
            .then((response) => {
                console.log(response.data);
                setAllTractors(response.data);
            })
            .catch((err) => {
                console.log(err);
            });

        setAllTractors("");
    };

    return (
        <div className={styles.main_container}>
            <button onClick={getAllTractors}>Get All Tractors</button>

            {/* {alltractors ? (
                alltractors.map((item) => (
                    <div class={styles.table_container} key={item.__v}>
                        <p>{item.unit}</p>
                        <p>{item.year}</p>
                        <p>{item.made_by}</p>
                        <p>{item.color}</p>
                        <p>{item.description}</p>
                        <p>{item.VIN}</p>
                        <p>{item.ownership}</p>
                        <p>{item.licence_plate}</p>
                        <p>{item.number_of_axles}</p>
                        <p>{item.weight}</p>
                        <p>{item.standard_job}</p>
                        <p>{item.status}</p>
                        <br />
                    </div>
                ))
            ) : (
                <span>None</span>
            )} */}

            <form onSubmit={handleSubmit} action="">
                <input
                    type="text"
                    placeholder="Enter Tractor"
                    onChange={inputChange}
                    value={tractor}
                />
                <button>Get Info</button>
            </form>
        </div>
    );
};

export default Inventory;
