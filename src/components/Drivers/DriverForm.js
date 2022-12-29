import styles from "../../components/Employee/Employee.module.css";
import Axios from "axios";
import { useState, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Permission from "../../components/Permission/Permission";
import Modal from "../../components/Modal/Modal";

import { Link } from "react-router-dom";

import { UserContext } from "../../UserContext";

//Hide password remaining

const Inventory = () => {
  const { isLoggedIn, setIsLoggedIn, role, modal, setModal, msg, setMsg } =
    useContext(UserContext);

  const [status, setStatus] = useState("");

  const [file, setFile] = useState({
    licence_disclosure: null,
    driving_license: null,
    abstract_request_form: null,
    current_abstract: null,
    personal_investigation_consent: null,
    criminal_record_check: null,
    pre_employment_road_test: null,
    employment_application: null,
    release_and_authorization: null,
    reference_checks: null,
    on_duty_hours_statement: null,
    certificate_of_violation: null,
    training: null,
    certificate_of_road_test: null,
  });

  const [data, setData] = useState({
    employee_name: "",
    start_date: "",
    employee_id: "",
    DL_number: "",
    expiry: "",
    medical_expiry_date: "",
    terminal: "",
    shift: "",
    employee_type: "",
    employee_status: "",
    phone_number: "",
    emergency_contact: "",
    supervisor: "",
    supervisor_notes: "",
    first_PR: "",
    semi_annual_PR: "",
    CVOR_points: "",
    employee_notes: "",
    other: "",
    accidents_and_citations: "",
  });

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
  };

  console.log("file", file);

  const formData = new FormData();

  const body = {
    employee_name: data.employee_name,
    start_date: `${data.start_date}`,
    employee_id: data.employee_id,
    DL_number: data.DL_number,
    expiry: `${data.expiry}`,
    medical_expiry_date: `${data.medical_expiry_date}`,
    terminal: data.terminal,
    shift: data.shift,
    employee_type: data.employee_type,
    employee_status: data.employee_status,
    phone_number: data.phone_number,
    emergency_contact: data.emergency_contact,
    supervisor: data.supervisor,
    supervisor_notes: data.supervisor_notes,
    first_PR: `${data.first_PR}`,
    semi_annual_PR: `${data.semi_annual_PR}`,
    CVOR_points: data.CVOR_points,
    employee_notes: data.employee_notes,
    other: data.other,
    accidents_and_citations: data.accidents_and_citations,
    files: file,
  };

  console.log("body.files", body.files);

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post(
      `https://lc-backend-v2.herokuapp.com/api/v1/LC/drivers/createDriver`,
      body,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    )
      .then((response) => {
        setStatus(response.status);
        console.log(response);
        // setMsg("Driver Added!");
        // setModal(true);
      })
      .catch((err) => {
        console.log(err);
        // setMsg("Check fields!!");
        // setModal(true);
      });
  };

  return (
    <>
      {/* {isLoggedIn ? ( */}
      <div className="wrapper_container">
        <Navbar />
        {!(role === "employee") ? (
          <div className={styles.main_container}>
            <form onSubmit={handleSubmit} action="">
              <div className={styles.table_wrapper_container}>
                <h1>Register Driver</h1>

                <div className={styles.table_container}>
                  <div className={styles.table_content}>
                    <label htmlFor="">Employee Name:</label>
                    <input
                      type="text"
                      placeholder="Enter employee Name"
                      name="employee_name"
                      onChange={inputChange}
                      value={data.employee_name}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Star date:</label>
                    <input
                      type="text"
                      placeholder="Enter start date"
                      name="start_date"
                      onChange={inputChange}
                      value={data.start_date}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Employee ID</label>
                    <input
                      type="text"
                      placeholder="Enter employee id"
                      name="employee_id"
                      onChange={inputChange}
                      value={data.employee_id}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Driver license number:</label>
                    <input
                      type="text"
                      placeholder="Enter driver licence"
                      name="DL_number"
                      onChange={inputChange}
                      value={data.DL_number}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Expiry</label>
                    <input
                      type="text"
                      placeholder="Enter epiry"
                      name="expiry"
                      onChange={inputChange}
                      value={data.expiry}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Medical expiry:</label>

                    <input
                      type="text"
                      placeholder="Enter Medical expiry"
                      name="medical_expiry_date"
                      onChange={inputChange}
                      value={data.medical_expiry_date}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Terminal:</label>

                    <input
                      type="text"
                      placeholder="Enter Terminal"
                      name="terminal"
                      onChange={inputChange}
                      value={data.terminal}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Shift:</label>

                    <input
                      type="text"
                      placeholder="Enter Shift"
                      name="shift"
                      onChange={inputChange}
                      value={data.shift}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Employee type:</label>

                    <input
                      type="text"
                      placeholder="Enter Employee type"
                      name="employee_type"
                      onChange={inputChange}
                      value={data.employee_type}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="shift">Employee status</label>
                    <input
                      type="text"
                      name="employee_status"
                      placeholder="Enter Employee status"
                      onChange={inputChange}
                      value={data.employee_status}
                      //   default="Select Shift"
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Semi annual PR:</label>

                    <input
                      type="text"
                      placeholder="Enter Semi annual PR"
                      name="semi_annual_PR"
                      onChange={inputChange}
                      value={data.semi_annual_PR}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">CVOR points:</label>

                    <input
                      type="text"
                      placeholder="Enter CVOR points"
                      name="CVOR_points"
                      onChange={inputChange}
                      value={data.CVOR_points}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Employee notes:</label>

                    <input
                      type="text"
                      placeholder="Enter employee notes"
                      name="employee_notes"
                      onChange={inputChange}
                      value={data.employee_notes}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Other:</label>

                    <input
                      type="text"
                      placeholder="Enter other"
                      name="other"
                      onChange={inputChange}
                      value={data.other}
                    />
                  </div>

                  <div className={styles.table_content}>
                    <label htmlFor="">Accidents and Citations:</label>

                    <input
                      type="text"
                      placeholder="Enter accidents and citations"
                      name="accidents_and_citations"
                      onChange={inputChange}
                      value={data.accidents_and_citations}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Phone number:</label>

                    <input
                      type="text"
                      placeholder="Enter accidents and citations"
                      name="phone_number"
                      onChange={inputChange}
                      value={data.phone_number}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">emergency_contact</label>

                    <input
                      type="text"
                      placeholder="Enter accidents and citations"
                      name="emergency_contact"
                      onChange={inputChange}
                      value={data.emergency_contact}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">supervisor</label>

                    <input
                      type="text"
                      placeholder="Enter accidents and citations"
                      name="supervisor"
                      onChange={inputChange}
                      value={data.supervisor}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">supervisor_notes</label>

                    <input
                      type="text"
                      placeholder="Enter accidents and citations"
                      name="supervisor_notes"
                      onChange={inputChange}
                      value={data.supervisor_notes}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">first_PR</label>

                    <input
                      type="text"
                      placeholder="Enter accidents and citations"
                      name="first_PR"
                      onChange={inputChange}
                      value={data.first_PR}
                    />
                  </div>
                  <div>
                    <label>Single licence disclosure</label>
                    <input
                      type="file"
                      name="licence_disclosure"
                      onChange={fileInputChange}
                      // value={file.licence_disclosure}
                    />
                  </div>
                  <div>
                    <label>Copy of valid driver's licence with photo</label>
                    <input
                      type="file"
                      name="driving_license"
                      onChange={fileInputChange}
                      // value={file.driving_license}
                    />
                  </div>
                  <div>
                    <label>Drivers Abstract Request form</label>
                    <input
                      type="file"
                      name="abstract_request_form"
                      onChange={fileInputChange}
                      // value={file.abstract_request_form}
                    />
                  </div>
                  <div>
                    <label>Current abstract(within 12 months)</label>
                    <input
                      type="file"
                      name="current_abstract"
                      onChange={fileInputChange}
                      // value={file.current_abstract}
                    />
                  </div>
                  <div>
                    <label>Consent to personal investigation</label>
                    <input
                      type="file"
                      name="personal_investigation_consent"
                      onChange={fileInputChange}
                      // value={file.personal_investigation_consent}
                    />
                  </div>
                  <div>
                    <label>Criminal record check</label>
                    <input
                      type="file"
                      name="criminal_record_check"
                      onChange={fileInputChange}
                      // value={file.criminal_record_check}
                    />
                  </div>
                  <div>
                    <label>Pre-employment Driver's road test</label>
                    <input
                      type="file"
                      name="pre_employment_road_test"
                      onChange={fileInputChange}
                      // value={file.pre_employment_road_test}
                    />
                  </div>
                  <div>
                    <label>Employment application</label>
                    <input
                      type="file"
                      name="employment_application"
                      onChange={fileInputChange}
                      // value={file.employment_application}
                    />
                  </div>
                  <div>
                    <label>
                      Release and authorization to contact previous employer
                    </label>
                    <input
                      type="file"
                      name="release_and_authorization"
                      onChange={fileInputChange}
                      // value={file.release_and_authorization}
                    />
                  </div>
                  <div>
                    <label>Reference checks</label>
                    <input
                      type="file"
                      name="reference_checks"
                      onChange={fileInputChange}
                      // value={file.reference_checks}
                    />
                  </div>
                  <div>
                    <label>Driver statement of onduty hours</label>
                    <input
                      type="file"
                      name="on_duty_hours_statement"
                      onChange={fileInputChange}
                      // value={file.on_duty_hours_statement}
                    />
                  </div>
                  <div>
                    <label>Certificate of violations(once every 6months)</label>
                    <input
                      type="file"
                      name="certificate_of_violation"
                      onChange={fileInputChange}
                      // value={file.certificate_of_violation}
                    />
                  </div>
                  <div>
                    <label>Annual Driver Performance Reviews</label>
                    <input
                      type="file"
                      name="certificate_of_road_test"
                      onChange={fileInputChange}
                      // value={file.certificate_of_road_test}
                    />
                  </div>
                  <div>
                    <label>Training</label>
                    <input
                      type="file"
                      name="training"
                      onChange={fileInputChange}
                      // value={file.training}
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
