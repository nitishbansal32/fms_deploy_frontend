import styles from "./Settings.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { useState, useContext, useEffect } from "react";
import ModalUpdate from "./ModalUpdate";
import Axios from "axios";
import { Link } from "react-router-dom";

import { UserContext } from "../../UserContext";

const Settings = () => {
  const { display, setDisplay, globalCompanyData, setGloabalCompanyData } =
    useContext(UserContext);

  const { modal, setModal, setModalColor, msg, setMsg } =
    useContext(UserContext);

  const email = localStorage.getItem("email");

  const oldLogo = localStorage.getItem("logo");

  const _id = localStorage.getItem("_id");

  const [companyData, setCompanyData] = useState("");

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  useEffect(() => {
    Axios.get(
      `https://loadlc-backend-staging.herokuapp.com/api/v1/LC/currCompany`,

      config
    )
      .then((response) => {
        console.log(response);
        setGloabalCompanyData(response.data.company);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const [file, setFile] = useState({
  //   logo: "",
  // });

  // const inputChange = (e) => {
  //   setData({
  //     ...data,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const fileInputChange = (e) => {
  //   setFile({
  //     ...file,
  //     [e.target.name]: e.target.files[0],
  //   });
  // };

  // const config = {
  //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  // };

  // const handleCompanyUpdate = (e) => {
  //   e.preventDefault();

  //   setMsg("Updating company info....");
  //   setModal(true);
  //   setModalColor("green");

  //   Axios.patch(
  //     `https://loadlc-backend-staging.herokuapp.com/api/v1/LC/updateCompany`,
  //     formData,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         // "Content-Type": "multipart/form-data",
  //       },
  //     }
  //   )
  //     .then((res) => {
  //       // console.log(res);
  //       setMsg("Company info updated!");
  //       setModal(true);
  //       setModalColor("green");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setMsg("Internal error!");
  //       setModal(true);
  //       setModalColor("red");
  //     });
  // };

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
          <form action="">
            <div className={styles.content_container}>
              <label htmlFor="">Address:</label>
              <p>
                {globalCompanyData.address ? globalCompanyData.address : "NA"}{" "}
              </p>
            </div>
            <div className={styles.content_container}>
              <label htmlFor="">City:</label>
              <p>{globalCompanyData.city ? globalCompanyData.city : "NA"} </p>
            </div>
            <div className={styles.content_container}>
              <label htmlFor="">Street:</label>
              <p>
                {globalCompanyData.street ? globalCompanyData.street : "NA"}{" "}
              </p>
            </div>
            <div className={styles.content_container}>
              <label htmlFor="">Province:</label>
              <p>
                {globalCompanyData.province ? globalCompanyData.province : "NA"}{" "}
              </p>
            </div>
            <div className={styles.content_container}>
              <label htmlFor="">Postal code:</label>
              <p>
                {globalCompanyData.postal_code
                  ? globalCompanyData.postal_code
                  : "NA"}{" "}
              </p>
            </div>
            <div className={styles.content_container}>
              <label htmlFor="">Country:</label>
              <p>
                {globalCompanyData.country ? globalCompanyData.country : "NA"}{" "}
              </p>
            </div>
            <div className={styles.content_container}>
              <label htmlFor="">PM reminder email:</label>
              <p>
                {globalCompanyData.PM_reminder_email
                  ? globalCompanyData.PM_reminder_email
                  : "NA"}{" "}
              </p>
            </div>
            <div className={styles.content_container}>
              <label htmlFor="">CVOR reminder email:</label>
              <p>
                {globalCompanyData.CVOR_reminder_email
                  ? globalCompanyData.CVOR_reminder_email
                  : "NA"}{" "}
              </p>
            </div>
            <div className={styles.content_container}>
              <label htmlFor="">Maintenance duration:</label>
              <p>
                {globalCompanyData.maintenance_duration
                  ? globalCompanyData.maintenance_duration
                  : "NA"}{" "}
              </p>
            </div>
            <div className={styles.content_container}>
              <label htmlFor="">Safety duration:</label>
              <p>
                {globalCompanyData.safety_duration
                  ? globalCompanyData.safety_duration
                  : "NA"}{" "}
              </p>
            </div>
            <div className={styles.content_container}>
              <label htmlFor="">Safety expiry type:</label>
              <p>
                {globalCompanyData.safety_expiry_type
                  ? globalCompanyData.safety_expiry_type
                  : "NA"}{" "}
              </p>
            </div>
            <div className={styles.content_container}>
              <label htmlFor="">Email active:</label>
              <p>
                {globalCompanyData.is_email_reminder_active
                  ? `${globalCompanyData.is_email_reminder_active}`
                  : "NA"}{" "}
              </p>
            </div>
            <div className={styles.content_container}>
              <label htmlFor="">SMS active:</label>
              <p>
                {globalCompanyData.is_sms_reminder_active
                  ? `${globalCompanyData.is_sms_reminder_active}`
                  : "NA"}{" "}
              </p>
            </div>

            <Link to="/updateCompany">
              <button className={styles.update_password}>Update info</button>
            </Link>
          </form>
        </div>
      </div>
      {display && <ModalUpdate />}
    </div>
  );
};

export default Settings;
