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
  } = useContext(UserContext);

  const navigate = useNavigate();

  const [status, setStatus] = useState("");

  const [postdata, setPostData] = useState("");

  const [data, setData] = useState({
    accident_number: accidentData.accident_number,
    accident_date: accidentData.accident_date,
    accident_time: accidentData.accident_time,
    driver_name: accidentData.driver_name,
    driver_licene_number: accidentData.driver_licene_number,
    tractor_number: accidentData.tractor_number,
    location: accidentData.location,
    accident_type: accidentData.accident_type,
    damage: accidentData.damage,
    towing: accidentData.towing,
    police_report_number: accidentData.police_report_number,
    police_officer: accidentData.police_officer,
    company_accident_report: accidentData.company_accident_report,
    claim_number: accidentData.claim_number,
    adjuster: accidentData.adjuster,
    driver_charged: accidentData.driver_charged,
    action_taken: accidentData.action_taken,
    cause_of_accident: accidentData.cause_of_accident,
    preventable: accidentData.preventable,
    const: accidentData.const,
    comments: accidentData.comments,
    driver_statement: accidentData.driver_statement,
  });

  const inputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name);
  };

  const body = {
    accident_number: data.accident_number,
    accident_date: data.accident_date,
    accident_time: data.accident_time,
    driver_name: data.driver_name,
    driver_licene_number: data.driver_licene_number,
    tractor_number: data.tractor_number,
    location: data.location,
    accident_type: data.accident_type,
    damage: data.damage,
    towing: data.towing,
    police_report_number: data.police_report_number,
    police_officer: data.police_officer,
    company_accident_report: data.company_accident_report,
    claim_number: data.claim_number,
    adjuster: data.adjuster,
    driver_charged: data.driver_charged,
    action_taken: data.action_taken,
    cause_of_accident: data.cause_of_accident,
    preventable: data.preventable,
    const: data.const,
    comments: data.comments,
    driver_statement: data.driver_statement,
  };

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.patch(
      `https://lc-backend-v2.herokuapp.com/api/v1/LC/accidents/${accidentData.accident_number}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => {
        setStatus(response.status);
        setMsg("Accident updated!");
        setModal(true);
      })
      .catch((err) => {
        console.log(err.response);
        // setMsg("Check fields!!");
        // setModal(true);
      });
  };

  const handleBack = () => {
    navigate("/accident", { replace: true });
  };

  return (
    <>
      {/* {isLoggedIn ? ( */}
      <div className="wrapper_container">
        <Navbar />
        {!(role === "employee") ? (
          <div className={styles.main_container}>
            <button onClick={handleBack} className={styles.back_button}>
              Back
            </button>
            <form onSubmit={handleSubmit} action="">
              <div className={styles.table_wrapper_container}>
                <h1>Update accident information</h1>

                <div className={styles.table_container}>
                  <div className={styles.table_content}>
                    <label htmlFor="">Accident number :</label>
                    <input
                      type="text"
                      placeholder="Enter accident_number "
                      name="accident_number"
                      onChange={inputChange}
                      value={data.accident_number}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Accident date: </label>
                    <input
                      type="text"
                      placeholder="Enter accident_date"
                      name="accident_date"
                      onChange={inputChange}
                      value={data.accident_date}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Accident time:</label>
                    <input
                      type="text"
                      placeholder="Enter accident time"
                      name="accident_time"
                      onChange={inputChange}
                      value={data.accident_time}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Driver name:</label>
                    <input
                      type="text"
                      placeholder="Enter driver_name"
                      name="driver_name"
                      onChange={inputChange}
                      value={data.driver_name}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Driver licene number</label>
                    <input
                      type="text"
                      placeholder="Enter driver_licene_number"
                      name="driver_licene_number"
                      onChange={inputChange}
                      value={data.driver_licene_number}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Tractor number:</label>

                    <input
                      type="text"
                      placeholder="Enter tractor_number"
                      name="tractor_number"
                      onChange={inputChange}
                      value={data.tractor_number}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">location:</label>

                    <input
                      type="text"
                      placeholder="Enter location"
                      name="location"
                      onChange={inputChange}
                      value={data.location}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Accident type:</label>

                    <input
                      type="text"
                      placeholder="Enter accident_type"
                      name="accident_type"
                      onChange={inputChange}
                      value={data.accident_type}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Damage:</label>

                    <input
                      type="text"
                      placeholder="Enter damage"
                      name="damage"
                      onChange={inputChange}
                      value={data.damage}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="shift">Towing:</label>
                    <input
                      type="text"
                      name="towing"
                      placeholder="Enter towing"
                      onChange={inputChange}
                      value={data.towing}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Police report number:</label>

                    <input
                      type="text"
                      placeholder="Enter police report number"
                      name="police_report_number"
                      onChange={inputChange}
                      value={data.police_report_number}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Police officer:</label>

                    <input
                      type="text"
                      placeholder="Enter police_officer"
                      name="police_officer"
                      onChange={inputChange}
                      value={data.police_officer}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Company accident report:</label>

                    <input
                      type="text"
                      placeholder="Enter company accident report"
                      name="company_accident_report"
                      onChange={inputChange}
                      value={data.company_accident_report}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Claim number:</label>

                    <input
                      type="text"
                      placeholder="Enter claim number"
                      name="claim_number"
                      onChange={inputChange}
                      value={data.claim_number}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Adjuster:</label>

                    <input
                      type="text"
                      placeholder="Enter adjuster"
                      name="adjuster"
                      onChange={inputChange}
                      value={data.adjuster}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Driver charged:</label>

                    <input
                      type="text"
                      placeholder="Enter driver charged"
                      name="driver_charged"
                      onChange={inputChange}
                      value={data.driver_charged}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Action taken:</label>

                    <input
                      type="text"
                      placeholder="Enter action taken"
                      name="action_taken"
                      onChange={inputChange}
                      value={data.action_taken}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Cause of accident:</label>

                    <input
                      type="text"
                      placeholder="Enter cause of accident"
                      name="cause_of_accident"
                      onChange={inputChange}
                      value={data.cause_of_accident}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Preventable:</label>
                    <input
                      type="text"
                      placeholder="Enter preventable"
                      name="preventable"
                      onChange={inputChange}
                      value={data.preventable}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Const:</label>

                    <input
                      type="text"
                      placeholder="Enter const"
                      name="const"
                      onChange={inputChange}
                      value={data.const}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Comments:</label>

                    <input
                      type="text"
                      placeholder="Enter comments"
                      name="comments"
                      onChange={inputChange}
                      value={data.comments}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Driver statement:</label>

                    <input
                      type="text"
                      placeholder="Enter driver statement"
                      name="driver_statement"
                      onChange={inputChange}
                      value={data.driver_statement}
                    />
                  </div>
                </div>
                <button>Submit</button>
              </div>
            </form>
          </div>
        ) : (
          <div>You do not have the necessary permissions to do this!</div>
        )}
      </div>
      {/* ) : (
                <Permission />
            )} */}
    </>
  );
};

export default Inventory;
