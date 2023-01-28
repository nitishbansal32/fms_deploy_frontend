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
    driverData,
    setDriverData,
    setModalColor,
    display,
    setDisplay,
  } = useContext(UserContext);

  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  console.log(driverData);

  const [file, setFile] = useState({
    profile_picture: driverData.profile_picture,
    license_disclosure: driverData.license_disclosure,
    driving_license: driverData.driving_license,
    abstract_request_form: driverData.abstract_request_form,
    current_abstract: driverData.current_abstract,
    personal_investigation_consent: driverData.personal_investigation_consent,
    criminal_record_check: driverData.criminal_record_check,
    pre_employment_road_test: driverData.pre_employment_road_test,
    employment_application: driverData.employment_application,
    release_and_authorization: driverData.release_and_authorization,
    reference_checks: driverData.reference_checks,
    on_duty_hours_statement: driverData.on_duty_hours_statement,
    certificate_of_violation: driverData.certificate_of_violation,
    training: driverData.training,
    certificate_of_road_test: driverData.certificate_of_road_test,

    disciplinary_actions: driverData.disciplinary_actions,
    safety_records: driverData.safety_records,
  });

  console.log("training", driverData.training);

  const [data, setData] = useState({
    employee_name: driverData.employee_name,
    start_date: driverData.start_date,
    employee_id: driverData.employee_id,
    DL_number: driverData.DL_number,
    expiry: driverData.expiry,
    medical_expiry_date: driverData.medical_expiry_date,
    terminal: driverData.terminal,
    shift: driverData.shift,
    employee_type: driverData.employee_type,
    employee_status: driverData.employee_status,
    phone_number: driverData.phone_number,
    emergency_contact: driverData.emergency_contact,
    supervisor: driverData.supervisor,
    supervisor_notes: driverData.supervisor_notes,
    first_PR: driverData.first_PR,
    semi_annual_PR: driverData.semi_annual_PR,
    CVOR_points: driverData.CVOR_points,
    employee_notes: driverData.employee_notes,
    other: driverData.other,
    accidents_and_citations: driverData.accidents_and_citations,
    DOB: driverData.DOB,
    gender: driverData.gender,
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
  formData.append("DOB", data.DOB);
  formData.append("gender", data.gender);

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

  formData.append("disciplinary_actions", file.disciplinary_actions);
  formData.append("safety_records", file.safety_records);

  const EmployeeName = driverData.employee_name;

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg("Updating driver info... Please wait!");
    setModal(true);
    setModalColor("green");

    Axios.patch(
      `https://lc-backend-v2.herokuapp.com/api/v1/LC/drivers/${EmployeeName}`,
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
        setMsg("Driver information updated!");
        setModal(true);
        setModalColor("green");
        setDriverData(response.data.driver);
      })
      .catch((err) => {
        console.log(err);
        if (
          err.response.data.msg ==
          "Duplicate value entered for employee_id field, please choose another value"
        ) {
          setMsg("Employee ID already exists!");
          setModal(true);
          setModalColor("red");
        } else if (err.response.data.msg == "File size must be less than 1MB") {
          setMsg("File size must be less than 1MB!");
          setModal(true);
          setModalColor("red");
        } else {
          setMsg("Try again after sometime!");
          setModal(true);
          setModalColor("red");
        }
      });
  };

  const handleBack = () => {
    setModal(false);
    setDisplay(true);
    navigate("/drivers", { replace: true });
  };

  const permissionHandler = () => {
    navigate("/drivers", { replace: true });
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
                <h1>Update driver information</h1>

                <div className={styles.table_container}>
                  <div className={styles.table_content}>
                    <label htmlFor="">*Employee ID:</label>
                    <input
                      type="text"
                      placeholder="E.g. 1234ABCD"
                      name="employee_id"
                      onChange={inputChange}
                      value={data.employee_id}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">*Employee Name:</label>
                    <input
                      type="text"
                      placeholder="E.g. David"
                      name="employee_name"
                      onChange={inputChange}
                      value={data.employee_name}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">*Gender:</label>
                    <input
                      type="text"
                      placeholder="E.g. Male"
                      name="gender"
                      onChange={inputChange}
                      value={data.gender}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Driver license number:</label>
                    <input
                      type="text"
                      placeholder="E.g. ABCD1234"
                      name="DL_number"
                      onChange={inputChange}
                      value={data.DL_number}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">*DOB:</label>
                    <input
                      type="date"
                      data-date-format="YYYY MM DD"
                      placeholder="E.g. David"
                      name="DOB"
                      onChange={inputChange}
                      value={data.DOB ? data.DOB.substr(0, 10) : ""}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">*Start date:</label>
                    <input
                      type="date"
                      data-date-format="YYYY MM DD"
                      placeholder="Enter start date"
                      name="start_date"
                      onChange={inputChange}
                      value={
                        data.start_date ? data.start_date.substr(0, 10) : ""
                      }
                      required
                    />
                  </div>

                  <div className={styles.table_content}>
                    <label htmlFor="">*Expiry:</label>
                    <input
                      type="date"
                      placeholder="YYYY-MM-DD"
                      placeholder="Enter epiry"
                      name="expiry"
                      onChange={inputChange}
                      value={data.expiry.substr(0, 10)}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Medical expiry:</label>

                    <input
                      type="date"
                      placeholder="YYYY-MM-DD"
                      placeholder="Enter Medical expiry"
                      name="medical_expiry_date"
                      onChange={inputChange}
                      value={data.medical_expiry_date.substr(0, 10)}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">*Shift:</label>
                    <select
                      name="shift"
                      id=""
                      onChange={inputChange}
                      value={data.shift}
                      required
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">*Employee type:</label>
                    <select
                      name="employee_type"
                      id=""
                      onChange={inputChange}
                      value={data.employee_type}
                      required
                    >
                      <option value="PT">PT</option>
                      <option value="FT">FT</option>
                    </select>
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">*Phone number:</label>

                    <input
                      type="text"
                      placeholder="E.g. 1234567890"
                      name="phone_number"
                      onChange={inputChange}
                      value={data.phone_number}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">*Emergency contact:</label>

                    <input
                      type="text"
                      placeholder="E.g. 1234567890"
                      name="emergency_contact"
                      onChange={inputChange}
                      value={data.emergency_contact}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Terminal:</label>

                    <input
                      type="text"
                      placeholder="E.g. MIS"
                      name="terminal"
                      onChange={inputChange}
                      value={data.terminal}
                    />
                  </div>

                  <div className={styles.table_content}>
                    <label htmlFor="shift">Employee status:</label>
                    <select
                      name="employee_status"
                      id=""
                      onChange={inputChange}
                      value={data.employee_status}
                    >
                      <option value="active">active</option>
                      <option value="inactive">active</option>
                    </select>
                  </div>

                  <div className={styles.table_content}>
                    <label htmlFor="">CVOR points:</label>

                    <input
                      type="number"
                      placeholder="Enter CVOR points"
                      name="CVOR_points"
                      onChange={inputChange}
                      value={data.CVOR_points}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Employee notes:</label>

                    <textarea
                      rows="2"
                      cols="25"
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
                    <label htmlFor="">Supervisor:</label>

                    <input
                      type="text"
                      placeholder="E.g. David"
                      name="supervisor"
                      onChange={inputChange}
                      value={data.supervisor}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Supervisor notes:</label>

                    <textarea
                      rows="2"
                      cols="25"
                      type="text"
                      placeholder="E.g. This driver is..."
                      name="supervisor_notes"
                      onChange={inputChange}
                      value={data.supervisor_notes}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Semi annual PR:</label>

                    <input
                      type="date"
                      data-date-format="YYYY MM DD"
                      placeholder="Enter Semi annual PR"
                      name="semi_annual_PR"
                      onChange={inputChange}
                      value={data.semi_annual_PR.substr(0, 10)}
                      disabled
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">First PR:</label>

                    <input
                      type="date"
                      data-date-format="YYYY MM DD"
                      placeholder="This is first PR"
                      name="first_PR"
                      onChange={inputChange}
                      value={data.first_PR.substr(0, 10)}
                      disabled
                    />
                  </div>
                  <div className={styles.table_file_container}>
                    <h1>Files updation</h1>

                    <div className={styles.file_container}>
                      <label>Profile picture</label>
                      <input
                        type="file"
                        name="profile_picture"
                        onChange={fileInputChange}
                        // value={file.license_disclosure}
                      />
                    </div>

                    <div className={styles.file_container}>
                      <label>Single licence disclosure</label>
                      <input
                        type="file"
                        name="license_disclosure"
                        onChange={fileInputChange}
                        // value={file.license_disclosure}
                      />
                    </div>
                    <div className={styles.file_container}>
                      <label>Copy of valid driver's licence with photo</label>
                      <input
                        type="file"
                        name="driving_license"
                        onChange={fileInputChange}
                        // value={file.driving_license}
                      />
                    </div>
                    <div className={styles.file_container}>
                      <label>Drivers Abstract Request form</label>
                      <input
                        type="file"
                        name="abstract_request_form"
                        onChange={fileInputChange}
                        // value={file.abstract_request_form}
                      />
                    </div>
                    <div className={styles.file_container}>
                      <label>Driver MDVR/CDVR</label>
                      <input
                        type="file"
                        name="current_abstract"
                        onChange={fileInputChange}
                        // value={file.current_abstract}
                      />
                    </div>
                    <div className={styles.file_container}>
                      <label>Consent to personal investigation</label>
                      <input
                        type="file"
                        name="personal_investigation_consent"
                        onChange={fileInputChange}
                        // value={file.personal_investigation_consent}
                      />
                    </div>
                    <div className={styles.file_container}>
                      <label>Criminal record check</label>
                      <input
                        type="file"
                        name="criminal_record_check"
                        onChange={fileInputChange}
                        // value={file.criminal_record_check}
                      />
                    </div>
                    <div className={styles.file_container}>
                      <label>Pre-employment Driver's road test</label>
                      <input
                        type="file"
                        name="pre_employment_road_test"
                        onChange={fileInputChange}
                        // value={file.pre_employment_road_test}
                      />
                    </div>
                    <div className={styles.file_container}>
                      <label>Employment application</label>
                      <input
                        type="file"
                        name="employment_application"
                        onChange={fileInputChange}
                        // value={file.employment_application}
                      />
                    </div>
                    <div className={styles.file_container}>
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
                    <div className={styles.file_container}>
                      <label>Reference checks</label>
                      <input
                        type="file"
                        name="reference_checks"
                        onChange={fileInputChange}
                        // value={file.reference_checks}
                      />
                    </div>
                    <div className={styles.file_container}>
                      <label>Driver statement of onduty hours</label>
                      <input
                        type="file"
                        name="on_duty_hours_statement"
                        onChange={fileInputChange}
                        // value={file.on_duty_hours_statement}
                      />
                    </div>
                    <div className={styles.file_container}>
                      <label>
                        Certificate of violations(once every 6months)
                      </label>
                      <input
                        type="file"
                        name="certificate_of_violation"
                        onChange={fileInputChange}
                        // value={file.certificate_of_violation}
                      />
                    </div>
                    <div className={styles.file_container}>
                      <label>Annual Driver Performance Reviews</label>
                      <input
                        type="file"
                        name="certificate_of_road_test"
                        onChange={fileInputChange}
                        // value={file.certificate_of_road_test}
                      />
                    </div>
                    <div className={styles.file_container}>
                      <label>Training</label>
                      <input
                        type="file"
                        name="training"
                        onChange={fileInputChange}
                        // value={file.training}
                      />
                    </div>

                    <div className={styles.file_container}>
                      <label>Disciplinary actions</label>
                      <input
                        type="file"
                        name="disciplinary_actions"
                        onChange={fileInputChange}
                        // value={file.training}
                      />
                    </div>

                    <div className={styles.file_container}>
                      <label>Safety records</label>
                      <input
                        type="file"
                        name="safety_records"
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
