import styles from "./Settings.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { useState, useContext } from "react";
import ModalUpdate from "./ModalUpdate";
import Axios from "axios";

import { UserContext } from "../../UserContext";

const Settings = () => {
  const { display, setDisplay } = useContext(UserContext);

  console.log(display);

  const email = localStorage.getItem("email");
  console.log(email);

  const oldLogo = localStorage.getItem("logo");

  const _id = localStorage.getItem("_id");

  const [data, setData] = useState({
    address: "",
    is_email_reminder_active: true,
    is_sms_reminder_active: true,
  });

  const [file, setFile] = useState({
    logo: "",
  });

  const inputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const fileInputChange = (e) => {
    setFile({
      ...file,
      [e.target.name]: e.target.files[0],
    });
  };

  console.log(file.logo);
  console.log(data.address);

  const formData = new FormData();
  formData.append("logo", file.logo);
  formData.append("address", data.address);
  formData.append("is_email_reminder_active", data.is_email_reminder_active);
  formData.append("is_sms_reminder_active", data.is_sms_reminder_active);

  const handleCompanyUpdate = (e) => {
    e.preventDefault();
    Axios.patch(
      `https://lc-backend-v2.herokuapp.com/api/v1/LC/updateCompany`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          // "Content-Type": "multipart/form-data",
        },
      }
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

        <div className={styles.company_update_container}>
          <h3>Company information</h3>
          <form action="" onSubmit={handleCompanyUpdate}>
            <div className={styles.content_container}>
              <label htmlFor="">Change logo:</label>
              <input type="file" onChange={fileInputChange} />
            </div>
            <div className={styles.content_container}>
              <label htmlFor="">Change address:</label>
              <textarea cols="20" rows="2" type="text" onChange={inputChange} />
            </div>
            <div className={styles.content_container}>
              <label htmlFor="">Email active:</label>
              <select
                name="is_email_reminder_active"
                id=""
                onChange={inputChange}
                value={data.is_email_reminder_active}
                required
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <div className={styles.content_container}>
              <label htmlFor="">SMS active:</label>
              <select
                name="is_sms_reminder_active"
                id=""
                onChange={inputChange}
                value={data.is_sms_reminder_active}
                required
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <button className={styles.update_password}>Update info</button>
          </form>
        </div>
      </div>
      {display && <ModalUpdate />}
    </div>
  );
};

export default Settings;
