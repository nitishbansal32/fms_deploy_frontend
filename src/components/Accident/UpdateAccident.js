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
    claim_number: accidentData.claim_number,
    adjuster: accidentData.adjuster,
    driver_charged: accidentData.driver_charged,
    action_taken: accidentData.action_taken,
    cause_of_accident: accidentData.cause_of_accident,
    preventable: accidentData.preventable,
    cost: accidentData.cost,
    comments: accidentData.comments,
    driver_statement: accidentData.driver_statement,
  });

  const [file, setFile] = useState({
    company_accident_report: accidentData.company_accident_report,
  });

  console.log(accidentData.accident_date);

  const inputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name);
  };

  const fileInputChange = (e) => {
    setFile({
      ...file,
      [e.target.name]: e.target.files[0],
    });
    console.log(e.target.name);
  };

  // const body = {
  //   accident_number: data.accident_number,
  //   accident_date: data.accident_date,
  //   accident_time: data.accident_time,
  //   driver_name: data.driver_name,
  //   driver_licene_number: data.driver_licene_number,
  //   tractor_number: data.tractor_number,
  //   location: data.location,
  //   accident_type: data.accident_type,
  //   damage: data.damage,
  //   towing: data.towing,
  //   police_report_number: data.police_report_number,
  //   police_officer: data.police_officer,
  //   company_accident_report: data.company_accident_report,
  //   claim_number: data.claim_number,
  //   adjuster: data.adjuster,
  //   driver_charged: data.driver_charged,
  //   action_taken: data.action_taken,
  //   cause_of_accident: data.cause_of_accident,
  //   preventable: data.preventable,
  //   cost: data.cost,
  //   comments: data.comments,
  //   driver_statement: data.driver_statement,
  // };

  const formData = new FormData();

  formData.append("accident_number", data.accident_number);
  formData.append("accident_date", data.accident_date);
  formData.append("accident_time", data.accident_time);
  formData.append("driver_name", data.driver_name);
  formData.append("driver_licene_number", data.driver_licene_number);
  formData.append("tractor_number", data.tractor_number);
  formData.append("location", data.location);
  formData.append("accident_type", data.accident_type);
  formData.append("damage", `${!data.damage ? "Y" : data.damage}`);
  formData.append("towing", `${!data.towing ? "Y" : data.towing}`);
  formData.append("police_report_number", data.police_report_number);
  formData.append("police_officer", data.police_officer);
  formData.append(
    "claim_number",
    `${!data.claim_number ? 0 : data.claim_number}`
  );
  formData.append("adjuster", data.adjuster);
  formData.append(
    "driver_charged",
    `${!data.driver_charged ? "No" : data.driver_charged}`
  );
  formData.append(
    "action_taken",
    `${!data.action_taken ? "No" : data.action_taken}`
  );
  formData.append("cause_of_accident", data.cause_of_accident);
  formData.append(
    "preventable",
    `${!data.preventable ? "No" : data.preventable}`
  );
  formData.append("cost", `${!data.cost ? 0 : data.cost}`);
  formData.append("comments", data.comments);
  formData.append("driver_statement", data.driver_statement);

  //File
  formData.append("company_accident_report", file.company_accident_report);

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModal(true);
    setMsg("Updating accident info....");
    setModalColor("green");
    Axios.patch(
      `https://loadlc-backend-staging.herokuapp.com/api/v1/LC/accidents/${accidentData.accident_number}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => {
        setAccidentData(response.data.accident);
        setStatus(response.status);
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

  const handleBack = () => {
    navigate("/accident", { replace: true });
    setDisplay(true);
    setModal(false);
  };

  const permissionHandler = () => {
    navigate("/accident", { replace: true });
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
                <h1>Update accident information</h1>

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
                      value={
                        data.accident_date
                          ? data.accident_date.substr(0, 10)
                          : ""
                      }
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
                    <label htmlFor="">*Driver licene number</label>
                    <input
                      type="text"
                      placeholder="E.g. ABCD1234"
                      name="driver_licene_number"
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
                      rows="2"
                      cols="25"
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
                    <label htmlFor="">Cost:</label>

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
                      rows="2"
                      cols="25"
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
                      rows="2"
                      cols="25"
                      type="text"
                      placeholder="E.g. Front car was.."
                      name="driver_statement"
                      onChange={inputChange}
                      value={data.driver_statement}
                    />
                  </div>
                  <div className={styles.table_file_container}>
                    <div>
                      <label>Company incident report</label>
                      <input
                        type="file"
                        name="company_accident_report"
                        onChange={fileInputChange}
                        // value={file.training}
                      />
                    </div>
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
