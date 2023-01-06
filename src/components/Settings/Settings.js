import styles from "./Settings.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { useState, useContext } from "react";
import ModalUpdate from "./ModalUpdate";

import { UserContext } from "../../UserContext";

const Settings = () => {
  const { display, setDisplay } = useContext(UserContext);

  console.log(display);

  const email = localStorage.getItem("email");
  console.log(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisplay(true);
  };

  return (
    <div className="wrapper_container">
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.personal_container}>
          <h3>Personal Information</h3>
          <form action="" onSubmit={handleSubmit}>
            <div className={styles.content_container}>
              <label htmlFor="">Email:</label>
              <p>{email}</p>
            </div>
            <button className={styles.update_password}>Update Password</button>
          </form>
        </div>
      </div>
      {display && <ModalUpdate />}
    </div>
  );
};

export default Settings;
