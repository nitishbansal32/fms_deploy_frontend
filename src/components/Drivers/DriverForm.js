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

  const navigate = useNavigate();

  const [validator, setValidator] = useState({
    StartDate: false,
    Expiry: false,
    MedicalExpiry: false,
    SemiAnnualPR: false,
    FirstPR: false,
    phone: false,
  });

  const ValidateFunc = () => {
    //Start date
    if (
      !/\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/.test(
        data.start_date
      )
    ) {
      setValidator((prev) => ({
        ...prev,
        [`StartDate`]: true,
      }));
    } else {
      setValidator((prev) => ({
        ...prev,
        [`StartDate`]: false,
      }));
    }

    //Expiry date
    if (
      !/\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/.test(data.expiry)
    ) {
      setValidator((prev) => ({
        ...prev,
        [`Expiry`]: true,
      }));
    } else {
      setValidator((prev) => ({
        ...prev,
        [`Expiry`]: false,
      }));
    }

    //Medical Expiry date
    if (
      !/\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/.test(
        data.medical_expiry_date
      )
    ) {
      setValidator((prev) => ({
        ...prev,
        [`MedicalExpiry`]: true,
      }));
    } else {
      setValidator((prev) => ({
        ...prev,
        [`MedicalExpiry`]: false,
      }));
    }

    //Semi annual PR
    if (
      !/\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/.test(
        data.semi_annual_PR
      )
    ) {
      setValidator((prev) => ({
        ...prev,
        [`SemiAnnualPR`]: true,
      }));
    } else {
      setValidator((prev) => ({
        ...prev,
        [`SemiAnnualPR`]: false,
      }));
    }

    //First PR
    if (
      !/\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/.test(data.first_PR)
    ) {
      setValidator((prev) => ({
        ...prev,
        [`FirstPR`]: true,
      }));
    } else {
      setValidator((prev) => ({
        ...prev,
        [`FirstPR`]: false,
      }));
    }

    //phone
    if (
      !/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(
        data.phone_number
      )
    ) {
      setValidator((prev) => ({
        ...prev,
        [`phone`]: true,
      }));
    } else {
      setValidator((prev) => ({
        ...prev,
        [`phone`]: false,
      }));
    }
  };

  const [file, setFile] = useState({
    profile_picture: "",
    license_disclosure: "",
    driving_license: "",
    abstract_request_form: "",
    current_abstract: "",
    personal_investigation_consent: "",
    criminal_record_check: "",
    pre_employment_road_test: "",
    employment_application: "",
    release_and_authorization: "",
    reference_checks: "",
    on_duty_hours_statement: "",
    certificate_of_violation: "",
    training: "",
    certificate_of_road_test: "",
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

  // console.log(data.emloyee_name);

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

  //Form Data
  formData.append("employee_name", data.employee_name);
  formData.append("start_date", data.start_date);
  formData.append("employee_id", data.employee_id);
  formData.append("DL_number", data.DL_number);
  formData.append("expiry", data.expiry);
  formData.append("medical_expiry_date", data.medical_expiry_date);
  formData.append("terminal", data.terminal);
  formData.append("shift", data.shift);
  formData.append("employee_type", data.employee_type);
  formData.append("employee_status", data.employee_status);
  formData.append("phone_number", data.phone_number);
  formData.append("emergency_contact", data.emergency_contact);
  formData.append("supervisor", data.supervisor);
  formData.append("supervisor_notes", data.supervisor_notes);
  formData.append("first_PR", data.first_PR);
  formData.append("semi_annual_PR", data.semi_annual_PR);
  formData.append("CVOR_points", data.CVOR_points);
  formData.append("employee_notes", data.employee_notes);
  formData.append("other", data.other);
  formData.append("accidents_and_citations", data.accidents_and_citations);

  //Files
  formData.append("profile_picture", file.profile_picture);
  formData.append("license_disclosure", file.license_disclosure);
  formData.append("driving_license", file.driving_license);
  formData.append("abstract_request_form", file.abstract_request_form);
  formData.append("current_abstract", file.current_abstract);
  formData.append(
    "personal_investigation_consent",
    file.personal_investigation_consent
  );
  formData.append("criminal_record_check", file.criminal_record_check);
  formData.append("pre_employment_road_test", file.pre_employment_road_test);
  formData.append("employment_application", file.employment_application);
  formData.append("release_and_authorization", file.release_and_authorization);
  formData.append("reference_checks", file.reference_checks);
  formData.append("on_duty_hours_statement", file.on_duty_hours_statement);
  formData.append("certificate_of_violation", file.certificate_of_violation);
  formData.append("training", file.training);
  formData.append("certificate_of_road_test", file.certificate_of_road_test);

  for (var [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    ValidateFunc();

    for (var [key, value] of formData.entries()) {
      console.log(key, value);
    }
    Axios.post(
      `https://lc-backend-v2.herokuapp.com/api/v1/LC/drivers/createDriver`,
      // `http://localhost:8000/api/v1/LC/drivers/createDriver`,
      formData,
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
        setMsg("Driver Added!");
        setModal(true);
      })
      .catch((err) => {
        console.log(err);
        // setMsg("Check fields!!");
        // setModal(true);
      });
  };

  const handleBack = () => {
    navigate("/drivers", { replace: true });
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
                <h1>Add new driver</h1>

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
                    <label htmlFor="">Start date:</label>
                    <input
                      type="text"
                      placeholder="Enter start date"
                      name="start_date"
                      onChange={inputChange}
                      value={data.start_date}
                      style={{ borderColor: validator.StartDate ? "red" : "" }}
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
                      style={{ borderColor: validator.Expiry ? "red" : "" }}
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
                      style={{
                        borderColor: validator.MedicalExpiry ? "red" : "",
                      }}
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
                    <select
                      name="shift"
                      id=""
                      onChange={inputChange}
                      value={data.shift}
                      // default={}
                    >
                      <option selected="selected" value="AM">
                        AM
                      </option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Employee type:</label>
                    <select
                      name="employee_type"
                      id=""
                      onChange={inputChange}
                      value={data.employee_type}
                    >
                      <option selected="selected" value="PT">
                        PT
                      </option>
                      <option value="FT">FT</option>
                    </select>
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="shift">Employee status</label>
                    <select
                      name="employee_status"
                      id=""
                      onChange={inputChange}
                      value={data.employee_status}
                    >
                      <option value="active">active</option>
                      <option value="active">active</option>
                    </select>
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Semi annual PR:</label>

                    <input
                      type="text"
                      placeholder="Enter Semi annual PR"
                      name="semi_annual_PR"
                      onChange={inputChange}
                      value={data.semi_annual_PR}
                      style={{
                        borderColor: validator.SemiAnnualPR ? "red" : "",
                      }}
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
                      style={{
                        borderColor: validator.phone ? "red" : "",
                      }}
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
                    <label htmlFor="">Supervisor</label>

                    <input
                      type="text"
                      placeholder="Enter accidents and citations"
                      name="supervisor"
                      onChange={inputChange}
                      value={data.supervisor}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Supervisor notes</label>

                    <input
                      type="text"
                      placeholder="Enter accidents and citations"
                      name="supervisor_notes"
                      onChange={inputChange}
                      value={data.supervisor_notes}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">First PR</label>

                    <input
                      type="text"
                      placeholder="Enter accidents and citations"
                      name="first_PR"
                      onChange={inputChange}
                      value={data.first_PR}
                      style={{
                        borderColor: validator.FirstPR ? "red" : "",
                      }}
                    />
                  </div>
                  <div>
                    <label>Profile picture</label>
                    <input
                      type="file"
                      name="profile_picture"
                      onChange={fileInputChange}
                      // value={file.license_disclosure}
                    />
                  </div>
                  <div>
                    <label>Single licence disclosure</label>
                    <input
                      type="file"
                      name="license_disclosure"
                      onChange={fileInputChange}
                      // value={file.license_disclosure}
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
