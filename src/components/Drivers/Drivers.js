import styles from "./Drivers.module.css";
import ModalDrivers from "./ModalDrivers";
import Axios from "axios";
import { useEffect, useState, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import Permission from "../../components/Permission/Permission";
import plus from "../../../src/Images/plus.svg";

import { UserContext } from "../../UserContext";

const Inventory = () => {
  const [alldrivers, setAlldrivers] = useState("");

  const [modalDrivers, setModalDrivers] = useState("");

  const [drivers, setdrivers] = useState("");

  const [file, setFile] = useState({
    license_disclosure: null,
    driving_license: null,
    abstract_request_form: null,
    current_abstract: null,
    personal_investigation_consent: null,
    criminal_record_check: null,
    pre_employment_road_test: null,
    employment_application: null,
    release_and_authorization: null,
    reference_checks: null,
    on_duty_hours_statement: null,
    certificate_of_violation: null,
    training: null,
    certificate_of_road_test: null,
  });

  const {
    isLoggedIn,
    setIsLoggedIn,
    role,
    setRole,
    msg,
    setMsg,
    display,
    setDisplay,
    setDriverData,
    setModalColor,
    setModal,
  } = useContext(UserContext);

  const [url, setUrl] = useState(role ? "" : "currDrivers"); // Url is dynamic, checking state of role

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
          `https://lc-backend-v2.herokuapp.com/api/v1/LC/drivers/${drivers}`,
          config
        )
          .then((response) => {
            console.log(response);
            setAlldrivers([response.data.driver]);
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
        `https://lc-backend-v2.herokuapp.com/api/v1/LC/drivers/${url}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((response) => {
          console.log(response);
          setAlldrivers(response.data.drivers);
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

  //Field Click Modal
  const handleInput = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    const InputClick = e.target.value;
    setModal(true);
    setMsg("Fetching data...");
    setModalColor("green");
    setDisplay((prevState) => !prevState);

    try {
      Axios.get(
        `https://lc-backend-v2.herokuapp.com/api/v1/LC/drivers/${InputClick}`,
        config
      )
        .then((response) => {
          console.log(response);
          console.log(response.data.driver);

          file.license_disclosure = response.data.driver.license_disclosure;
          file.driving_license = response.data.driver.driving_license;
          file.abstract_request_form =
            response.data.driver.abstract_request_form;
          file.current_abstract = response.data.driver.current_abstract;
          file.personal_investigation_consent =
            response.data.driver.personal_investigation_consent;
          file.criminal_record_check =
            response.data.driver.criminal_record_check;
          file.pre_employment_road_test =
            response.data.driver.pre_employment_road_test;
          file.employment_application =
            response.data.driver.employment_application;
          file.release_and_authorization =
            response.data.driver.release_and_authorization;
          file.reference_checks = response.data.driver.reference_checks;
          file.on_duty_hours_statement =
            response.data.driver.on_duty_hours_statement;
          file.certificate_of_violation =
            response.data.driver.certificate_of_violation;
          file.training = response.data.driver.training;
          file.certificate_of_road_test =
            response.data.driver.certificate_of_road_test;
          setModalDrivers([response.data.driver]);
          setDriverData(response.data.driver);
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
      setModalDrivers("");
    }
  };

  return (
    <>
      <div className="wrapper_container">
        <Navbar />
        <div className={styles.main_container}>
          <div className={styles.button_heading}>
            <form onSubmit={handleSubmit} action="">
              <div className={styles.form_input_label}>
                <input
                  type="text"
                  placeholder="Enter driver's name"
                  onChange={inputChange}
                  value={drivers}
                />
                <button className="button_get">Search</button>
              </div>
            </form>
            <button onClick={getAlldrivers} className="button_all">
              Get all drivers
            </button>
            <Link to="/registerDriver">
              <button className="button_add">
                <img src={plus} alt="" />
                Add new driver
              </button>
            </Link>
          </div>

          <div className={styles.table_wrapper_container}>
            <h1>Drivers Information</h1>

            <div className={styles.table_container}>
              <div className={styles.table_main_container}>
                <div className={styles.grid_headings}>
                  <span>Employee Name</span>
                  <span>Employee ID</span>
                  <span>Terminal</span>
                  <span>Shift</span>
                  <span>Employee Type</span>
                </div>
                <hr />
                {alldrivers &&
                  alldrivers.map((item) => (
                    <div>
                      <div
                        className={styles.input_container}
                        key={item.employee_name}
                      >
                        <div className={styles.grid_inputs}>
                          <input
                            type="text"
                            value={item.employee_name}
                            onClick={handleInput}
                          />
                          <input type="text" value={item.employee_id} />
                          <input type="text" value={item.terminal} />
                          <input type="text" value={item.shift} />
                          <input type="text" value={item.employee_type} />
                        </div>
                        <hr />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {display && (
            <ModalDrivers
              modalDrivers={modalDrivers}
              display={display}
              file={file}
            />
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
