import styles from "./Accident.module.css";
import Axios from "axios";
import { useEffect, useState, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import Permission from "../../components/Permission/Permission";
import plus from "../../../src/Images/plus.svg";

import ModalAccident from "./ModalAccident";

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

  const [url, setUrl] = useState(role ? "" : "currAccidents"); // Url is dynamic, checking state of role

  const [urlState, seturlState] = useState();

  const inputChange = (e) => {
    setdrivers(e.target.value);
  };

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  // Input Box Handler

  const handleSubmit = (e) => {
    e.preventDefault();
    setModal(true);
    setMsg("Fetching data...");
    setModalColor("green");

    try {
      if (!(e.target[0].value == "")) {
        Axios.get(
          `https://lc-backend-v2.herokuapp.com/api/v1/LC/accidents/${drivers}`,
          config
        )
          .then((response) => {
            console.log(response);
            setAlldrivers([response.data.accident]);
            setModal(false);
          })
          .catch((err) => {
            console.log(err);
            if (err.response.status === 404) {
              setModal(true);
              setMsg("No data found");
              setModalColor("red");
            }
          });
      }
    } catch (exc) {
      console.log(exc); //Set a state to
    } finally {
      setAlldrivers("");
    }
  };

  //For Getting all tractors

  const getAlldrivers = () => {
    setModal(true);
    setMsg("Fetching data...");
    setModalColor("green");
    try {
      Axios.get(
        `https://lc-backend-v2.herokuapp.com/api/v1/LC/accidents/${url}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((response) => {
          console.log(response);
          setAlldrivers(response.data.accidents);
          setModal(false);
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setModal(true);
            setMsg("No data found");
            setModalColor("red");
          } else {
            setModal(true);
            setMsg("Please try again...");
            setModalColor("red");
          }
        });
    } catch (exc) {
      console.log(exc);
    } finally {
      setAlldrivers("");
    }
  };

  // To switch between normal and table format
  const viewHandler = () => {
    setViewState((prevState) => !prevState);
    console.log(viewState);
  };

  const handleInput = (e) => {
    setModal(true);
    setMsg("Fetching data...");
    setModalColor("green");
    e.preventDefault();
    const InputClick = e.target.value;

    setDisplay((prevState) => !prevState);

    try {
      Axios.get(
        `https://lc-backend-v2.herokuapp.com/api/v1/LC/accidents/${InputClick}`,
        config
      )
        .then((response) => {
          console.log(response);
          setModalAccident([response.data.accident]);
          setAccidentData(response.data.accident);
          setModal(false);
        })
        .catch((err) => {
          console.log(err);
          setModal(true);
          setMsg("Please try again...");
          setModalColor("red");
        });
    } catch (exc) {
      console.log(exc);
    } finally {
      setAccidentData("");
    }
  };

  return (
    <>
      {/* {isLoggedIn ? ( */}
      <div className="wrapper_container">
        <Navbar />
        <div className={styles.main_container}>
          <div className={styles.button_heading}>
            <form onSubmit={handleSubmit} action="">
              <div className={styles.form_input_label}>
                {/* <h2>Get details of a single driver: </h2> */}
                <input
                  type="text"
                  placeholder="Enter accident number"
                  onChange={inputChange}
                  value={drivers}
                />
                <button className="button_get">Search</button>
              </div>
            </form>
            <div className={styles.button_alignment_container}>
              <button onClick={getAlldrivers} className="button_all">
                Get all accidents
              </button>
              <Link to="/registerAccident">
                <button className="button_add">
                  <img src={plus} alt="" />
                  Add new accident
                </button>
              </Link>
            </div>
          </div>

          <div className={styles.table_wrapper_container}>
            <h1>Accidents Information</h1>
            {/* <h1>DRIVERS INFORMATION</h1> */}
            <div
              className={styles.table_container}
              // style={{
              //   background: viewState ? "transparent" : "white",
              // }}
            >
              <div className={styles.table_main_container}>
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
              </div>
            </div>
          </div>
          {display && (
            <ModalAccident modalAccident={modalAccident} display={display} />
          )}
        </div>
      </div>
      {/* ) : (
                <Permission />
            )} */}
    </>
  );
};

export default Inventory;
