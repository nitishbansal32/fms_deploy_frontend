import styles from "../../components/Employee/Employee.module.css";
import Axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Permission from "../../components/Permission/Permission";
import Modal from "../../components/Modal/Modal";

import { Link } from "react-router-dom";

import { UserContext } from "../../UserContext";

//Hide password remaining

const Inventory = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    role,
    modal,
    setModal,
    msg,
    setMsg,
    accidentData,
    setAccidentData,
    modalColor,
    setModalColor,
    display,
    setDisplay,
    globalCompanyData,
    setGloabalCompanyData,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const [status, setStatus] = useState("");

  const [postdata, setPostData] = useState("");

  const [data, setData] = useState({
    city: globalCompanyData.city,
    street: globalCompanyData.street,
    province: globalCompanyData.province,
    postal_code: globalCompanyData.postal_code,
    country: globalCompanyData.country,
    address: globalCompanyData.address,
    is_email_reminder_active: globalCompanyData.is_email_reminder_active,
    is_sms_reminder_active: globalCompanyData.is_sms_reminder_active,
    PM_reminder_email: globalCompanyData.PM_reminder_email,
    CVOR_reminder_email: globalCompanyData.CVOR_reminder_email,
    maintenance_duration: globalCompanyData.maintenance_duration,
    safety_duration: globalCompanyData.safety_duration,
    safety_expiry_type: globalCompanyData.safety_expiry_type,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setModal(true);
    setMsg("Updating company info....");
    setModalColor("green");
    Axios.patch(
      `https://loadlc-backend-staging.herokuapp.com/api/v1/LC/updateCompany`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => {
        console.log(response);
        setGloabalCompanyData(response.data.company);
        setMsg("Accident info updated!");
        setModalColor("green");
        setModal(true);
      })
      .catch((err) => {
        console.log(err.response);
        setMsg("Try again after sometime!");
        setModal(true);
        setModalColor("red");
      });
  };

  console.log(globalCompanyData);

  const handleBack = () => {
    navigate("/settings", { replace: true });
    setDisplay(false);
    setModal(false);
  };

  const permissionHandler = () => {
    navigate("/settings", { replace: true });
    setModal(false);
  };

  return (
    <>
      {/* {isLoggedIn ? ( */}
      <div className="wrapper_container">
        <Navbar />
        {!(localStorage.getItem("role") === "employee") ? (
          <div className={styles.main_container}>
            <form onSubmit={handleSubmit} action="">
              <div className={styles.table_wrapper_container}>
                <h1>Update company information</h1>

                <div className={styles.table_container}>
                  <div className={styles.table_content}>
                    <label htmlFor="">Address:</label>
                    <textarea
                      row="5"
                      col="20"
                      type="text"
                      onChange={inputChange}
                      name="address"
                      value={data.address}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">City: </label>
                    <input
                      type="text"
                      onChange={inputChange}
                      name="city"
                      value={data.city}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Street:</label>
                    <input
                      type="text"
                      onChange={inputChange}
                      name="street"
                      value={data.street}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Province:</label>
                    <input
                      type="text"
                      onChange={inputChange}
                      name="province"
                      value={data.province}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Postal code:</label>
                    <input
                      type="text"
                      onChange={inputChange}
                      name="postal_code"
                      value={data.postal_code}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Country:</label>
                    <input
                      type="text"
                      onChange={inputChange}
                      name="country"
                      value={data.country}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">PM reminder email:</label>
                    <input
                      type="email"
                      onChange={inputChange}
                      name="PM_reminder_email"
                      value={data.PM_reminder_email}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">CVOR reminder email:</label>
                    <input
                      type="email"
                      onChange={inputChange}
                      name="CVOR_reminder_email"
                      value={data.CVOR_reminder_email}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Maintenance duration:</label>
                    <input
                      type="text"
                      onChange={inputChange}
                      name="maintenance_duration"
                      value={data.maintenance_duration}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Safety duration:</label>
                    <input
                      type="text"
                      onChange={inputChange}
                      name="safety_duration"
                      value={data.safety_duration}
                    />
                  </div>
                  <div className={styles.table_content}>
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
                  <div className={styles.table_content}>
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
                  <div className={styles.table_content}>
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
                  <div className={styles.content_container}>
                    <label htmlFor="">Change logo:</label>
                    <input type="file" name="logo" onChange={fileInputChange} />
                  </div>
                </div>
                <div className={styles.button_alignment_container}>
                  <button>Submit</button>
                  <button onClick={handleBack} className={styles.back_button}>
                    Back
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="permission_tag">
            <p>You are not authorized to make updates!</p>
            <button onClick={permissionHandler}>Go back</button>
          </div>
        )}
      </div>
      {/* ) : (
                <Permission />
            )} */}
    </>
  );
};

export default Inventory;
