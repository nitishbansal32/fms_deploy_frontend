import styles from "./Settings.module.css";
import { useState, useContext } from "react";
import Axios from "axios";

import { UserContext } from "../../UserContext";

const ModalUpdate = () => {
  const { display, setDisplay, modal, setModal, msg, setMsg } =
    useContext(UserContext);

  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const body = {
    oldPassword: data.oldPassword,
    newPassword: data.newPassword,
  };

  const handleDisplay = () => {
    setDisplay(false);
    console.log("hello");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.patch(
      `https://lc-backend-v2.herokuapp.com/api/v1/LC/updatePassword`,
      body,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => {
        console.log(res);
        setMsg("Password updated!");
        setModal(true);
        if (res.data.msg === "Invalid Credentials") {
          setMsg("Check Password!");
          setModal(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.main_modal_container}>
      <form action="" onSubmit={handleSubmit}>
        <div className={styles.fields_container}>
          <div className={styles.modal_content}>
            <label htmlFor="">Old Password:</label>
            <input
              name="oldPassword"
              type="text"
              onChange={handleInput}
              value={data.oldPassword}
            />
          </div>
          <div className={styles.modal_content}>
            <label htmlFor="">New Password:</label>
            <input
              name="newPassword"
              type="text"
              onChange={handleInput}
              value={data.newPassword}
            />
          </div>
        </div>
        <div className={styles.modal_button_container}>
          <button className="button_general">Update</button>
          <button className="button_general" onClick={handleDisplay}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalUpdate;
