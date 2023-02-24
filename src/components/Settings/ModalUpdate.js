import styles from "./Settings.module.css";
import { useState, useContext } from "react";
import Axios from "axios";

import { UserContext } from "../../UserContext";

const ModalUpdate = () => {
  const { display, setDisplay, modal, setModal, msg, setMsg, setModalColor } =
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
    setMsg("Updating password...");
    setModal(true);
    setModalColor("green");
    Axios.patch(
      `https://loadlc-backend-staging.herokuapp.com/api/v1/LC/updatePassword`,
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
        setModalColor("green");

        if (res.data.msg === "Invalid Credentials") {
          setMsg("Invalid credentials!");
          setModal(true);
          setModalColor("red");
        }
      })
      .catch((err) => {
        if (err.respone.data.msg === "Invalid Credentials") {
          setMsg("Invalid credentials!");
          setModal(true);
          setModalColor("red");
        } else {
          setMsg("Try again later!");
          setModal(true);
          setModalColor("red");
        }
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
              required
            />
          </div>
          <div className={styles.modal_content}>
            <label htmlFor="">New Password:</label>
            <input
              name="newPassword"
              type="text"
              onChange={handleInput}
              value={data.newPassword}
              required
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
