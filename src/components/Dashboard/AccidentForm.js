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
  const {
    isLoggedIn,
    setIsLoggedIn,
    role,
    modal,
    setModal,
    msg,
    setMsg,
    modalColor,
    setModalColor,
  } = useContext(UserContext);

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
    cost: "",
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
    damage: `${!data.damage ? "Y" : data.damage}`,
    towing: `${!data.towing ? "Y" : data.towing}`,
    police_report_number: data.police_report_number,
    police_officer: data.police_officer,
    company_accident_report: data.company_accident_report,
    claim_number: data.claim_number,
    adjuster: data.adjuster,
    driver_charged: `${!data.driver_charged ? "No" : data.driver_charged}`,
    action_taken: `${!data.action_taken ? "No" : data.action_taken}`,
    cause_of_accident: data.cause_of_accident,
    preventable: `${!data.preventable ? "No" : data.preventable}`,
    cost: data.cost,
    comments: data.comments,
    driver_statement: data.driver_statement,
  };

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ValidatorFunc();
    setModal(true);
    setMsg("Adding new accident....");
    setModalColor("green");
    Axios.post(
      `https://lc-backend-v2.herokuapp.com/api/v1/LC/accidents/createAccident`,
      body,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => {
        setStatus(response.status);
        setMsg("Accident info Added!");
        setModal(true);
        setModalColor("green");
      })
      .catch((err) => {
        console.log(err.response);
        setMsg("Try again after sometime!");
        setModal(true);
        setModalColor("red");
      });
  };

  const handleBack = () => {
    navigate("/accident", { replace: true });
    setModal(false);
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
                    <label htmlFor="">*Accident number :</label>
                    <input
                      type="number"
                      min="0"
                      placeholder="E.g. 1234"
                      name="accident_number"
                      onChange={inputChange}
                      value={data.accident_number}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">*Accident date: </label>
                    <input
                      type="date"
                      data-date-format="YYYY MM DD"
                      placeholder="Enter accident_date"
                      name="accident_date"
                      onChange={inputChange}
                      value={data.accident_date}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">*Accident time:</label>
                    <input
                      type="time"
                      placeholder="E.g. 22:10:23"
                      name="accident_time"
                      onChange={inputChange}
                      value={data.accident_time}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">*Driver name:</label>
                    <input
                      type="text"
                      placeholder="E.g. Ryder"
                      name="driver_name"
                      onChange={inputChange}
                      value={data.driver_name}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">*Driver licence number</label>
                    <input
                      type="text"
                      placeholder="E.g. ABCD1234"
                      name="driver_licene_number"
                      minlength="17"
                      maxlength="17"
                      onChange={inputChange}
                      value={data.driver_licene_number}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">*Tractor number:</label>

                    <input
                      type="text"
                      placeholder="E.g. 123ABC"
                      name="tractor_number"
                      onChange={inputChange}
                      value={data.tractor_number}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">*Location:</label>

                    <input
                      type="text"
                      placeholder="Enter location"
                      name="location"
                      onChange={inputChange}
                      value={data.location}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">*Accident type:</label>

                    <input
                      type="text"
                      placeholder="Enter accident_type"
                      name="accident_type"
                      onChange={inputChange}
                      value={data.accident_type}
                      required
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
                      <option selected="selected" value="Y">
                        Y
                      </option>
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
                      <option selected="selected" value="Y">
                        Y
                      </option>
                      <option value="N">N</option>
                    </select>
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">*Police report number:</label>

                    <input
                      type="text"
                      placeholder="E.g. ABC1234"
                      name="police_report_number"
                      onChange={inputChange}
                      value={data.police_report_number}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">*Police officer:</label>

                    <input
                      type="text"
                      placeholder="E.g. Williams"
                      name="police_officer"
                      onChange={inputChange}
                      value={data.police_officer}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Company incident report:</label>

                    <textarea
                      cols="25"
                      rows="2"
                      type="text"
                      placeholder="Incident info"
                      name="company_accident_report"
                      onChange={inputChange}
                      value={data.company_accident_report}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Claim number:</label>

                    <input
                      type="number"
                      placeholder="E.g. 1234.."
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
                      <option selected="selected" value="No">
                        No
                      </option>
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

                    <textarea
                      cols="25"
                      rows="2"
                      type="text"
                      placeholder="E.g. break failure"
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
                    <label htmlFor="">Cost($):</label>

                    <input
                      type="number"
                      min="0"
                      placeholder="Enter cost"
                      name="cost"
                      onChange={inputChange}
                      value={data.cost}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Comments:</label>

                    <textarea
                      cols="25"
                      rows="2"
                      type="text"
                      placeholder="E.g. Negligence"
                      name="comments"
                      onChange={inputChange}
                      value={data.comments}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Driver statement:</label>

                    <textarea
                      cols="25"
                      rows="2"
                      type="text"
                      placeholder="E.g. Front car was.."
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
