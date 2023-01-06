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

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  useEffect(() => {
    // Axios.get("https://lc-backend-v2.herokuapp.com/api/v1/LC/expired", config)
    Axios.get("http://localhost:8000/api/v1/LC/expired", config)
      .then((res) => {
        console.log(res.data);
        setExpDrivingLicense(res.data.expired_driving_licenses);
        setExpMedicalLicense(res.data.expired_medical_licenses);
        setExpPlate(res.data.expired_plates);
        setExpSafety(res.data.expired_safety);
      })
      .catch((err) => {
        console.log(err);
      });

    // Axios.get("https://lc-backend-v2.herokuapp.com/api/v1/LC/activity", config)
    Axios.get("http://localhost:8000/api/v1/LC/activity", config)
      .then((res) => {
        setActivity(res.data.activities);
        // console.log(res.data.activities);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {/* {!(isLoggedIn===null) ? ( */}
      <div className="wrapper_container">
        <Navbar />
        <div className={styles.main_container}>
          <div className={styles.left_container}>
            <div className={styles.left_top_container}>
              <div className={styles.expiry_main_container}>
                <h2>Expiry</h2>

                <div className={styles.expiry_container}>
                  <div className={styles.expiry_content_container}>
                    <h3>Expired driving licenses</h3>
                    {expDrivingLicense &&
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
                    <h3>Expired medical licenses</h3>
                    {expMedicalLicense.map((item) => (
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
                    <h3>Expired plates</h3>
                    {expPlate.map((item) => (
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
                    <h3>Expired safety</h3>
                    {expSafety.map((item) => (
                      <>
                        <div className={styles.expiry_content}>
                          <div>{item.licence_plate}</div>
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
              <Link to="/registerInventory">
                <div className={styles.add_container}>
                  <h2>Add equipment:</h2>
                  <button className="button_add">
                    <img src={plus} alt="" />
                    Add new equipment
                  </button>
                </div>
              </Link>
              <Link to="/registerDriver">
                <div className={styles.add_container}>
                  <h2>Add driver:</h2>
                  <button className="button_add">
                    <img src={plus} alt="" />
                    Add new driver
                  </button>
                </div>
              </Link>
              <Link to="/registerAccident">
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
                <span>View All</span>
              </div>
              <img src alt="" />
              <div className={styles.activity_desc}>
                {activity.map((item) => (
                  <div className={styles.activity}>
                    <p className={styles.heading}>{item.heading}</p>
                    <p className={styles.date}>
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
