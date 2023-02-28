import { Link, Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import styles from "./Dashboard.module.css";
import Navbar from "../../components/Navbar/Navbar";

import plus from "../../../src/Images/plus.svg";

import Permission from "../../components/Permission/Permission";

import { UserContext } from "../../UserContext";

import Axios from "axios";

const Dashboard = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [activity, setActivity] = useState([]);

  const [expDrivingLicense, setExpDrivingLicense] = useState([]);
  const [expMedicalLicense, setExpMedicalLicense] = useState([]);
  const [expPlate, setExpPlate] = useState([]);
  const [expSafety, setExpSafety] = useState([]);

  const [dlState, setDlState] = useState(true);
  const [mlState, setMlState] = useState(false);
  const [plateState, setPlateState] = useState(false);
  const [safetyState, setSafetyState] = useState(false);

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  useEffect(() => {
    Axios.get(
      "https://loadlc-backend-staging.herokuapp.com/api/v1/LC/expired",
      config
    )
      .then((res) => {
        // console.log(res.data);

        setExpDrivingLicense(res.data.expired_driving_licenses);
        setExpMedicalLicense(res.data.expired_medical_licenses);
        setExpPlate(res.data.expired_plates);
        setExpSafety(res.data.expired_safety);
      })
      .catch((err) => {
        console.log(err);
      });
    Axios.get(
      "https://loadlc-backend-staging.herokuapp.com/api/v1/LC/activity",
      config
    )
      .then((res) => {
        setActivity(res.data.activities);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleActivity = (e) => {
    e.preventDefault();
    setActivity([]);
    Axios.get(
      "https://loadlc-backend-staging.herokuapp.com/api/v1/LC/activity",
      config
    )
      .then((res) => {
        // console.log(res);
        setActivity(res.data.activities);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="wrapper_container">
        <Navbar />
        <div className={styles.main_container}>
          <div className={styles.left_container}>
            <div className={styles.left_top_container}>
              <div className={styles.expiry_main_container}>
                <h2>Expiry</h2>
                <div className={styles.expiry_button}>
                  <button
                    onClick={() => {
                      setDlState((prevState) => !prevState);
                      setMlState(false);
                      setPlateState(false);
                      setSafetyState(false);
                    }}
                    style={{
                      backgroundColor: dlState ? "#e84b01" : "white",
                      color: dlState ? "white" : "black",
                    }}
                  >
                    Expired driving licences
                  </button>
                  <button
                    onClick={() => {
                      setDlState(false);
                      setMlState((prevState) => !prevState);
                      setPlateState(false);
                      setSafetyState(false);
                    }}
                    style={{
                      backgroundColor: mlState ? "#e84b01" : "white",
                      color: mlState ? "white" : "black",
                    }}
                  >
                    Expired medical licences
                  </button>
                  <button
                    onClick={() => {
                      setDlState(false);
                      setMlState(false);
                      setPlateState((prevState) => !prevState);
                      setSafetyState(false);
                    }}
                    style={{
                      backgroundColor: plateState ? "#e84b01" : "white",
                      color: plateState ? "white" : "black",
                    }}
                  >
                    Expired plates
                  </button>
                  <button
                    onClick={() => {
                      setDlState(false);
                      setMlState(false);
                      setPlateState(false);
                      setSafetyState((prevState) => !prevState);
                    }}
                    style={{
                      backgroundColor: safetyState ? "#e84b01" : "white",
                      color: safetyState ? "white" : "black",
                    }}
                  >
                    Expired safety
                  </button>
                </div>
                <div className={styles.expiry_container}>
                  <div className={styles.expiry_content_container}>
                    {dlState && !(expDrivingLicense.length === 0) && (
                      <h3>Expired driving licenses</h3>
                    )}
                    {dlState &&
                      expDrivingLicense &&
                      expDrivingLicense.map((item) => (
                        <>
                          <div className={styles.expiry_content}>
                            <div>{item.employee_name}</div>
                            <div>{item.expiry.substr(0, 10)}</div>
                          </div>
                          <hr />
                        </>
                      ))}
                  </div>
                  <div className={styles.expiry_content_container}>
                    {mlState && !(expMedicalLicense.length === 0) && (
                      <h3>Expired medical licenses</h3>
                    )}

                    {mlState &&
                      expMedicalLicense &&
                      expMedicalLicense.map((item) => (
                        <>
                          <div className={styles.expiry_content}>
                            <div>{item.employee_name}</div>
                            <div>{item.medical_expiry_date.substr(0, 10)}</div>
                          </div>
                          <hr />
                        </>
                      ))}
                  </div>
                  <div className={styles.expiry_content_container}>
                    {plateState && !(expPlate.length === 0) && (
                      <h3>Expired plates</h3>
                    )}
                    {plateState &&
                      expPlate &&
                      expPlate.map((item) => (
                        <>
                          <div className={styles.expiry_content}>
                            <div>{item.licence_plate}</div>
                            <div>{item.plate_expiry_date.substr(0, 10)}</div>
                          </div>
                          <hr />
                        </>
                      ))}
                  </div>
                  <div className={styles.expiry_content_container}>
                    {safetyState && !(expSafety.length === 0) && (
                      <h3>Expired safety</h3>
                    )}
                    {safetyState &&
                      expSafety &&
                      expSafety.map((item) => (
                        <>
                          <div className={styles.expiry_content}>
                            <div>{item.unit}</div>
                            <div>{item.safety_expiry_date.substr(0, 10)}</div>
                          </div>
                          <hr />
                        </>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.main_add_container}>
              <Link to="/registerDashInventory">
                <div className={styles.add_container}>
                  <h2>Add equipment:</h2>
                  <button className="button_add">
                    <img src={plus} alt="" />
                    Add new equipment
                  </button>
                </div>
              </Link>
              <Link to="/registerDashDriver">
                <div className={styles.add_container}>
                  <h2>Add driver:</h2>
                  <button className="button_add">
                    <img src={plus} alt="" />
                    Add new driver
                  </button>
                </div>
              </Link>
              <Link to="/registerDashAccident">
                <div className={styles.add_container}>
                  <h2>Add accident:</h2>
                  <button className="button_add">
                    <img src={plus} alt="" />
                    Add new accident
                  </button>
                </div>
              </Link>
            </div>
          </div>
          <div className={styles.right_container}>
            <div className={styles.activity_main}>
              <div className={styles.activity_heading}>
                <h1>Activity</h1>

                <button onClick={handleActivity}>Refresh</button>
              </div>
              <img src alt="" />
              <div className={styles.activity_desc}>
                {activity &&
                  activity.map((item) => (
                    <div
                      className={styles.activity}
                      style={{
                        backgroundColor: `${
                          item.type === "UPDATION"
                            ? "#e84b01"
                            : item.type === "CREATION"
                            ? "green"
                            : item.type === "REMINDER"
                            ? "#FFC800"
                            : item.type === "WARNING"
                            ? "#D22B2B"
                            : "#f5f5f5"
                        }`,
                      }}
                    >
                      <p
                        className={styles.heading}
                        style={{
                          color: `${
                            item.type === "UPDATION"
                              ? "white"
                              : item.type === "CREATION"
                              ? "white"
                              : item.type === "REMINDER"
                              ? "white"
                              : item.type === "WARNING"
                              ? "white"
                              : "black"
                          }`,
                        }}
                      >
                        {item.heading}
                      </p>
                      <p
                        className={styles.date}
                        style={{
                          color: `${
                            item.type === "UPDATION"
                              ? "white"
                              : item.type === "CREATION"
                              ? "white"
                              : item.type === "REMINDER"
                              ? "white"
                              : item.type === "WARNING"
                              ? "white"
                              : "black"
                          }`,
                        }}
                      >
                        {item.updatedAt.substr(0, 10)}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ) : (
                <Permission />
            )} */}
    </>
  );
  // }
};

export default Dashboard;
