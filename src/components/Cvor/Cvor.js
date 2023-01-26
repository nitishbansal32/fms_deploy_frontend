import styles from "./Cvor.module.css";
import Axios from "axios";
import { useEffect, useState, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import Permission from "../../components/Permission/Permission";
import plus from "../../../src/Images/plus.svg";

import { UserContext } from "../../UserContext";

const Inventory = () => {
  const [alldrivers, setAlldrivers] = useState([]);

  const [drivers, setdrivers] = useState("");

  const [viewState, setViewState] = useState(false);

  const [modalAccident, setModalAccident] = useState([]);

  const {
    isLoggedIn,
    setIsLoggedIn,
    role,
    setRole,
    msg,
    display,
    setDisplay,
    setMsg,
    setAccidentData,
    setModalColor,
    setModal,
  } = useContext(UserContext);

  const inputChange = (e) => {
    setdrivers(e.target.value);
  };

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  //For Getting all tractors

  const getAlldrivers = () => {
    setModal(true);
    setMsg("Fetching data...");
    setModalColor("green");
    try {
      Axios.get(`https://lc-backend-v2.herokuapp.com/api/v1/LC/currCVOR`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (exc) {
      console.log(exc);
    } finally {
      setAlldrivers("");
    }
  };

  return (
    <>
      {/* {isLoggedIn ? ( */}
      <div className="wrapper_container">
        <Navbar />
        <div className={styles.main_container}>
          <div className={styles.button_heading}>
            <div className={styles.button_alignment_container}>
              <button onClick={getAlldrivers} className="button_all">
                Get all files
              </button>
              <Link to="/registerCvor">
                <button className="button_add">
                  <img src={plus} alt="" />
                  Add new files
                </button>
              </Link>
            </div>
          </div>

          <div className={styles.table_wrapper_container}>
            <h1>CVOR files</h1>
            {/* <h1>DRIVERS INFORMATION</h1> */}
            <div
              className={styles.table_container}
              // style={{
              //   background: viewState ? "transparent" : "white",
              // }}
            >
              {/* <div className={styles.table_main_container}>
                <div className={styles.grid_headings}>
                  <span>Accident number</span>
                  <span>Accident date</span>
                  <span>Driver name</span>
                </div>
                <hr />
                {alldrivers &&
                  alldrivers.map((item) => (
                    <div key={item.accident_number}>
                      <div className={styles.input_container}>
                        <div className={styles.grid_inputs}>
                          <input
                            type="text"
                            value={item.accident_number}
                            onClick={handleInput}
                          />{" "}
                          <input
                            type="text"
                            value={item.accident_date.substr(0, 10)}
                          />
                          <input type="text" value={item.driver_name} />
                        </div>
                        <hr />
                      </div>
                    </div>
                  ))}
              </div> */}
            </div>
          </div>
          {/* {display && (
            <ModalAccident modalAccident={modalAccident} display={display} />
          )} */}
        </div>
      </div>
      {/* ) : (
                <Permission />
            )} */}
    </>
  );
};

export default Inventory;
