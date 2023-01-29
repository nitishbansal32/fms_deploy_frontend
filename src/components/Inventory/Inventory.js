import styles from "./Inventory.module.css";
import ModalInventory from "./ModalInventory";
import Axios from "axios";
import { useEffect, useState, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import Permission from "../../components/Permission/Permission";
import { useNavigate } from "react-router-dom";

import plus from "../../../src/Images/plus.svg";

import { UserContext } from "../../UserContext";

const Inventory = () => {
  const [alldrivers, setAlldrivers] = useState([]);

  const [drivers, setdrivers] = useState("");

  const [viewState, setViewState] = useState(false);

  const [modalInventory, setModalInventory] = useState("");

  const {
    isLoggedIn,
    setIsLoggedIn,
    role,
    setRole,
    msg,
    setMsg,
    display,
    setDisplay,
    inventoryData,
    setInventoryData,
    setModalColor,
    setModal,
  } = useContext(UserContext);

  const [url, setUrl] = useState(role ? "" : "currTractors"); // Url is dynamic, checking state of role

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

    console.log(e.target[0].value);
    setModal(true);
    setMsg("Fetching data...");
    setModalColor("green");

    try {
      if (!(e.target[0].value == "")) {
        Axios.get(
          `https://lc-backend-v2.herokuapp.com/api/v1/LC/tractors/${drivers}`,
          config
        )
          .then((response) => {
            console.log(response);
            setAlldrivers([response.data.tractor]);
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
      setModal(false);
    }
  };

  //For Getting all tractors

  const getAllTractors = () => {
    setModal(true);
    setMsg("Fetching data...");
    setModalColor("green");
    try {
      Axios.get(
        `https://lc-backend-v2.herokuapp.com/api/v1/LC/tractors/${url}?type=Tractor`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((response) => {
          console.log(response);
          setAlldrivers(response.data.tractors);
          setModal(false);
        })
        .catch((err) => {
          console.log(err);
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

  //For Getting all trailers

  const getAllTrailers = () => {
    setModal(true);
    setMsg("Fetching data...");
    setModalColor("green");
    try {
      Axios.get(
        `https://lc-backend-v2.herokuapp.com/api/v1/LC/tractors/${url}?type=Trailer`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((response) => {
          console.log(response);
          setAlldrivers(response.data.tractors);
          setModal(false);
        })
        .catch((err) => {
          console.log(err);
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

  //To get all straight trucks

  const getAllStraightTrucks = () => {
    setModal(true);
    setMsg("Fetching data...");
    setModalColor("green");
    try {
      Axios.get(
        `https://lc-backend-v2.herokuapp.com/api/v1/LC/tractors/${url}?type=Straight Truck`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((response) => {
          console.log(response);
          setAlldrivers(response.data.tractors);
          setModal(false);
        })
        .catch((err) => {
          console.log(err);
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

  // For clicking on the primary key target the modal opens
  const handleInput = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    const InputClick = e.target.value;

    setDisplay((prevState) => !prevState);

    try {
      Axios.get(
        `https://lc-backend-v2.herokuapp.com/api/v1/LC/tractors/${InputClick}`,
        config
      )
        .then((response) => {
          console.log(response);
          setModalInventory([response.data.tractor]);
          setInventoryData(response.data.tractor);
        })
        .catch((err) => {
          console.log(err);
          // if (err.request.status === 404) {
          //   setMsg("Enter correct detail");
          // } else if (err.request.status === 400) {
          //   setMsg("Enter correct detail");
          // } else if (err.request.status === 403) {
          //   setMsg("You are forbidden!");
          // }
        });
    } catch (exc) {
      console.log(exc);
    } finally {
      setModalInventory("");
    }
  };

  return (
    <>
      {/* {isLoggedIn ? ( */}
      <div className="wrapper_container">
        <Navbar />
        <div className={styles.main_container}>
          <div className={styles.button_heading}>
            <form onSubmit={handleSubmit}>
              <div className={styles.form_input_label}>
                {/* <h2>Get details of a single driver: </h2> */}
                <input
                  type="text"
                  placeholder="Enter equipment number"
                  onChange={inputChange}
                  value={drivers}
                />
                <button className="button_get">Search</button>
              </div>
            </form>
            <div className={styles.button_alignment_container}>
              <button onClick={getAllTractors} className="button_all">
                Get all tractors
              </button>
              <button onClick={getAllTrailers} className="button_all">
                Get all trailers
              </button>
              <button onClick={getAllStraightTrucks} className="button_all">
                Get all straight trucks
              </button>
              <Link to="/registerInventory">
                <button className="button_add">
                  <img src={plus} alt="" />
                  Add new equipement
                </button>
              </Link>
            </div>
          </div>

          <div className={styles.table_wrapper_container}>
            <h1>Equipment Information</h1>
            {/* <h1>DRIVERS INFORMATION</h1> */}
            <div
              className={styles.table_container}
              // style={{
              //   background: viewState ? "transparent" : "white",
              // }}
            >
              <div className={styles.table_main_container}>
                <div className={styles.grid_headings}>
                  <span>Unit</span>
                  <span>VIN</span>
                  <span>License plate</span>
                </div>
                <hr />
                {alldrivers &&
                  alldrivers.map((item) => (
                    <div key={item.unit}>
                      <div className={styles.input_container}>
                        <div className={styles.grid_inputs}>
                          <input
                            type="text"
                            value={item.unit}
                            onClick={handleInput}
                          />{" "}
                          <input type="text" value={item.VIN} />
                          <input type="text" value={item.licence_plate} />
                        </div>
                        <hr />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {display && (
            <ModalInventory modalInventory={modalInventory} display={display} />
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
