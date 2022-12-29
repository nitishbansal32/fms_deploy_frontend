import styles from "./Accident.module.css";
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

  const [modal, setModal] = useState(false);

  const { isLoggedIn, setIsLoggedIn, role, setRole, msg, setMsg } =
    useContext(UserContext);

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

    console.log(e.target[0].value);

    setModal(false);

    try {
      if (!(e.target[0].value == "")) {
        Axios.get(
          `http://localhost:8000/api/v1/LC/accidents/${drivers}`,
          config
        )
          .then((response) => {
            console.log(response);
            setAlldrivers([response.data.accident]);
            setModal(false);
          })
          .catch((err) => {
            console.log(err);
            setModal(true);
            // if (err.request.status === 404) {
            //   setMsg("Enter correct detail");
            // } else if (err.request.status === 400) {
            //   setMsg("Enter correct detail");
            // } else if (err.request.status === 403) {
            //   setMsg("You are forbidden!");
            // }
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
    console.log(role);
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

  // To switch between normal and table format
  const viewHandler = () => {
    setViewState((prevState) => !prevState);
    console.log(viewState);
  };

  const Modal = (
    <div className={styles.excel_container}>
      <h1>All information</h1>
      <div className={styles.excel_sub_container}>
        <table>
          <tr>
            <th>Accident numbers</th>
            <th>Accident Date</th>
            <th>Accident time</th>
            <th>Driver name</th>
            <th>Driver licence number</th>
            <th>Tractor number</th>
            <th>Location</th>
            <th>Accident type</th>
            <th>Damage</th>
            <th>Towing</th>
            <th>Police report number</th>
            <th>Police officer</th>
            <th>Company accident report</th>
            <th>Claim number</th>
            <th>Adjuster</th>
            <th>Driver charged</th>
            <th>Action taken</th>
            <th>Cause of accident</th>
            <th>Preventable</th>
            <th>Comments</th>
            <th>Driver statement</th>
          </tr>
          {alldrivers &&
            alldrivers.map((item) => (
              <tr>
                <td>{item.accident_number}</td>
                <td>{item.accident_date.substr(0, 10)}</td>
                <td>{item.accident_time}</td>
                <td>{item.driver_name}</td>
                <td>{item.driver_licene_number}</td>
                <td>{item.tractor_number}</td>
                <td>{item.location}</td>
                <td>{item.accident_type}</td>
                <td>{item.damage}</td>
                <td>{item.towing}</td>
                <td>{item.police_report_number}</td>
                <td>{item.police_officer}</td>
                <td>{item.company_accident_report}</td>
                <td>{item.claim_number}</td>
                <td>{item.adjuster}</td>
                <td>{item.driver_charged}</td>
                <td>{item.action_taken}</td>
                <td>{item.cause_of_accident}</td>
                <td>{item.preventable}</td>
                <td>{item.comments}</td>
                <td>{item.driver_statement}</td>
              </tr>
            ))}
        </table>
      </div>
      <button onClick={viewHandler}> Close</button>
    </div>
  );

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
                  placeholder="Enter accidents"
                  onChange={inputChange}
                  value={drivers}
                  style={{
                    border: modal ? "1.5px solid red" : "0",
                  }}
                />
                <button className="button_get">Get Info</button>
              </div>
            </form>
            <button onClick={getAlldrivers} className="button_all">
              Get All Accidents
            </button>
            <Link to="/registerAccident">
              <button className="button_add">
                <img src={plus} alt="" />
                Add new accident
              </button>
            </Link>
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
              {!viewState ? (
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
                            <input type="text" value={item.accident_number} />{" "}
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
              ) : (
                Modal
              )}
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
