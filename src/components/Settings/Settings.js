import styles from "./Settings.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { useState, useContext, useEffect } from "react";
import ModalUpdate from "./ModalUpdate";
import Axios from "axios";

import { UserContext } from "../../UserContext";

const Settings = () => {
  const { display, setDisplay } = useContext(UserContext);

  const { modal, setModal, setModalColor, msg, setMsg } =
    useContext(UserContext);

  console.log(display);

  const email = localStorage.getItem("email");

  const oldLogo = localStorage.getItem("logo");

  const _id = localStorage.getItem("_id");

  const [data, setData] = useState({
    city: "",
    street: "",
    province: "",
    postal_code: "",
    country: "",
    address: "",
    is_email_reminder_active: true,
    is_sms_reminder_active: true,
    PM_reminder_email: "",
    CVOR_reminder_email: "",
    maintenance_duration: "",
    safety_duration: "",
    safety_expiry_type: "",
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

  const formData = new FormData();
  formData.append("logo", file.logo);

  formData.append("address", data.address);
  formData.append("country", data.country);
  formData.append("city", data.city);
  formData.append("street", data.street);
  formData.append("province", data.province);
  formData.append("postal_code", data.postal_code);
  formData.append("is_email_reminder_active", data.is_email_reminder_active);
  formData.append("is_sms_reminder_active", data.is_sms_reminder_active);

  formData.append("PM_reminder_email", data.PM_reminder_email);
  formData.append("CVOR_reminder_email", data.CVOR_reminder_email);
  formData.append("maintenance_duration", data.maintenance_duration);
  formData.append("safety_duration", data.safety_duration);
  formData.append("safety_expiry_type", data.safety_expiry_type);

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  // useEffect(() => {
  //   Axios.get(
  //     `https://lc-backend-v2.herokuapp.com/api/v1/LC/currCompany`,

  //     config
  //   )
  //     .then((response) => {
  //       setData({
  //         ...data,
  //         ["address"]: response.data.company.address,
  //       });
  //       console.log(response);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const handleCompanyUpdate = (e) => {
    e.preventDefault();

    setMsg("Updating company info....");
    setModal(true);
    setModalColor("green");

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
        // console.log(res);
        setMsg("Company info updated!");
        setModal(true);
        setModalColor("green");
      })
      .catch((err) => {
        console.log(err);
        setMsg("Internal error!");
        setModal(true);
        setModalColor("red");
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
          <h3>Company information</h3>
          <form action="" onSubmit={handleSubmit}>
            <div className={styles.content_email_container}>
              <label htmlFor="">Email:</label>
              <p>{email}</p>
            </div>
            <button className={styles.update_password}>Update Password</button>
          </form>
        </div>

        <div className={styles.company_update_container}>
          <form action="" onSubmit={handleCompanyUpdate}>
            <div className={styles.content_container}>
              <label htmlFor="">Change logo:</label>
              <input type="file" name="logo" onChange={fileInputChange} />
            </div>
            <div className={styles.content_container}>
              <label htmlFor="">Address:</label>
              <textarea
                row="5"
                col="20"
                type="text"
                onChange={inputChange}
                name="address"
                value={data.addresss}
              />
            </div>
            <div className={styles.content_container}>
              <label htmlFor="">City:</label>
              <input
                type="text"
                onChange={inputChange}
                name="city"
                value={data.city}
              />
            </div>
            <div className={styles.content_container}>
              <label htmlFor="">Street:</label>
              <input
                type="text"
                onChange={inputChange}
                name="street"
                value={data.street}
              />
            </div>
            <div className={styles.content_container}>
              <label htmlFor="">Province:</label>
              <input
                type="text"
                onChange={inputChange}
                name="province"
                value={data.province}
              />
            </div>
            <div className={styles.content_container}>
              <label htmlFor="">Postal code:</label>
              <input
                type="text"
                onChange={inputChange}
                name="postal_code"
                value={data.postal_code}
              />
            </div>
            <div className={styles.content_container}>
              <label htmlFor="">Country:</label>
              <input
                type="text"
                onChange={inputChange}
                name="country"
                value={data.country}
              />
            </div>
            <div className={styles.content_container}>
              <label htmlFor="">PM reminder email:</label>
              <input
                type="email"
                onChange={inputChange}
                name="PM_reminder_email"
                value={data.PM_reminder_email}
              />
            </div>
            <div className={styles.content_container}>
              <label htmlFor="">CVOR reminder email:</label>
              <input
                type="email"
                onChange={inputChange}
                name="CVOR_reminder_email"
                value={data.CVOR_reminder_email}
              />
            </div>
            <div className={styles.content_container}>
              <label htmlFor="">Maintenance duration:</label>
              <input
                type="text"
                onChange={inputChange}
                name="maintenance_duration"
                value={data.maintenance_duration}
              />
            </div>
            <div className={styles.content_container}>
              <label htmlFor="">Safety duration:</label>
              <input
                type="text"
                onChange={inputChange}
                name="safety_duration"
                value={data.safety_duration}
              />
            </div>
            <div className={styles.content_container}>
              <label htmlFor="">Safety expiry type:</label>
              <select
                name="safety_expiry_type"
                id=""
                onChange={inputChange}
                value={data.safety_expiry_type}
                required
              >
                <option value="Semi-Annual">Semi-Annual</option>
                <option value="Annual">Annual</option>
              </select>
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
