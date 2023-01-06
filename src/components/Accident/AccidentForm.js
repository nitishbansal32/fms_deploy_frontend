import styles from "../../components/Employee/Employee.module.css";
import Axios from "axios";
import { useState, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Permission from "../../components/Permission/Permission";
import Modal from "../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import { UserContext } from "../../UserContext";

//Hide password remaining

const Inventory = () => {
  const { isLoggedIn, setIsLoggedIn, role, modal, setModal, msg, setMsg } =
    useContext(UserContext);

  const [status, setStatus] = useState("");

  const [postdata, setPostData] = useState("");

  const [validator, setValidator] = useState({
    date: false,
  });

  const ValidatorFunc = () => {
    //Accident Date validator
    if (
      !/\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/.test(
        data.accident_date
      )
    ) {
      setValidator((prev) => ({
        ...prev,
        [`date`]: true,
      }));
    } else {
      setValidator((prev) => ({
        ...prev,
        [`date`]: false,
      }));
    }
  };

  const navigate = useNavigate();
  const [data, setData] = useState({
    accident_number: "",
    accident_date: "",
    accident_time: "",
    driver_name: "",
    driver_licene_number: "",
    tractor_number: "",
    location: "",
    accident_type: "",
    damage: "",
    towing: "",
    police_report_number: "",
    police_officer: "",
    company_accident_report: "",
    claim_number: "",
    adjuster: "",
    driver_charged: "",
    action_taken: "",
    cause_of_accident: "",
    preventable: "",
    const: "",
    comments: "",
    driver_statement: "",
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

    ValidatorFunc();

    Axios.post(
      `https://lc-backend-v2.herokuapp.com/api/v1/LC/drivers/createDriver`,
      body,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => {
        setStatus(response.status);
        setMsg("Driver Added!");
        setModal(true);
      })
      .catch((err) => {
        console.log(err.response);
        setMsg("Check fields!!");
        setModal(true);
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
                <h1>Add new accident</h1>

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
                      style={{ borderColor: validator.date ? "red" : "" }}
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
                      type="email"
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
                    <select
                      name="damage"
                      id=""
                      onChange={inputChange}
                      value={data.damage}
                    >
                      <option value="Y">Y</option>
                      <option value="N">N</option>
                    </select>
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="shift">Towing:</label>
                    <select
                      name="towing"
                      id=""
                      onChange={inputChange}
                      value={data.towing}
                    >
                      <option value="Y">Y</option>
                      <option value="N">N</option>
                    </select>
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
                      placeholder="Enter police officer"
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
                    <select
                      name="driver_charged"
                      id=""
                      onChange={inputChange}
                      value={data.driver_charged}
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Action taken:</label>
                    <select
                      name="action_taken"
                      id=""
                      onChange={inputChange}
                      value={data.action_taken}
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
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
                    <select
                      name="preventable"
                      id=""
                      onChange={inputChange}
                      value={data.preventable}
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
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
