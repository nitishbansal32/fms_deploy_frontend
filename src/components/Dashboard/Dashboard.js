import { Link, Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import styles from "./Dashboard.module.css";
import Navbar from "../../components/Navbar/Navbar";

import Permission from "../../components/Permission/Permission";

import { UserContext } from "../../UserContext";

import Axios from "axios";

const Dashboard = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [activity, setActivity] = useState([]);

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  // Axios.get("https://lc-backend-v2.herokuapp.com/api/v1/LC/activity", config)
  //   .then((res) => {
  //     setActivity(res.data.activities);
  //     console.log(res.data.activities);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  return (
    <>
      {/* {!(isLoggedIn===null) ? ( */}
      <div className="wrapper_container">
        <Navbar />
        <div className={styles.main_container}>
          <div className={styles.container}>
            {activity.map((item) => {
              <p>{item.heading}</p>;
            })}
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
