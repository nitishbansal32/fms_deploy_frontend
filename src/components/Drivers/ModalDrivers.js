import styles from "./Drivers.module.css";
import Axios from "axios";
import { UserContext } from "../../UserContext";
import { useEffect, useState, useContext } from "react";
import Logo from "../../../src/Images/DriversLogo.svg";

const ModalDrivers = (props) => {
  const { display, setDisplay } = useContext(UserContext);
  const url = "";
  const [file, setFile] = useState("");

  const handleDisplay = () => {
    setDisplay((prevState) => !prevState);
  };

  const handleFileSubmit = () => {
    Axios.post(url);
  };

  // console.log(props.file);

  return (
    <div className={styles.main_modal_container}>
      <div className={styles.modal_container}>
        {props.modalDrivers &&
          props.modalDrivers.map((item) => (
            <div className={styles.wrap_container}>
              <div className={styles.licence_container}>
                <div className={styles.driver_licence_container}>
                  <div className={styles.top_container}>
                    <img
                      src={Logo}
                      alt=""
                      className={styles.driving_licence_logo}
                    />
                    <h3>
                      Driver's Licence <br /> Permis de conduire
                    </h3>
                    <div className={styles.top_container_heading}>
                      <h1>ON</h1>
                      <span>CANADA</span>
                    </div>
                  </div>
                  <div className={styles.bottom_container}>
                    <div className={styles.left_container}>
                      <img src alt="" className={styles.driver_image} />
                      <div>
                        <label>EMP ID</label>
                        <p>{item.employee_id}</p>
                      </div>
                    </div>
                    <div className={styles.right_container}>
                      <div className={styles.gap_column_container}>
                        <label>NAME/NOM</label>
                        <p>{item.employee_name}</p>
                      </div>
                      <div className={styles.row_container}>
                        <div>
                          <label>START DATE</label>
                          <p>{item.start_date.substr(0, 10)}</p>
                        </div>
                        <div>
                          <label>4b EXP/EXP</label>
                          <p>{item.expiry.substr(0, 10)} </p>
                        </div>
                      </div>

                      <div className={styles.gap_column_container}>
                        <label>DL NUMBER</label>
                        <p>{item.DL_number}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.extra_main_container}>
                  <h2>Other information</h2>
                  <div className={styles.extra_container}>
                    <div className={styles.left_extra_container}>
                      <div>
                        <label>Medical Expiry:</label>
                        <p>{item.medical_expiry_date.substr(0, 10)}</p>
                      </div>{" "}
                      <div>
                        <label>Phone Number:</label>
                        <p>{item.phone_number}</p>
                      </div>
                      <div>
                        <label>Emergency contact:</label>
                        <p>{item.emergency_contact}</p>
                      </div>
                      <div>
                        <label>Terminal:</label>
                        <p>{item.terminal} </p>
                      </div>
                      <div>
                        <label>shift:</label>
                        <p>{item.shift}</p>
                      </div>
                      <div>
                        <label>employee_type:</label>
                        <p>{item.employee_type}</p>
                      </div>
                      <div>
                        <label>employee_status:</label>
                        <p>{item.employee_status}</p>
                      </div>
                      <div>
                        <label>supervisor:</label>
                        <p>{item.supervisor}</p>
                      </div>
                    </div>
                    <div className={styles.right_extra_container}>
                      <div>
                        <label>supervisor_notes:</label>
                        <p>{item.supervisor_notes}</p>
                      </div>
                      <div>
                        <label>First PR:</label>
                        <p>{item.first_PR.substr(0, 10)}</p>
                      </div>
                      <div>
                        <label>Semi annual PR:</label>
                        <p>{item.semi_annual_PR.substr(0, 10)}</p>
                      </div>
                      <div>
                        <label>CVOR points:</label>
                        <p>{item.CVOR_points}</p>
                      </div>
                      <div>
                        <label>employee_notes:</label>
                        <p> {item.employee_notes}</p>
                      </div>
                      <div>
                        <label>other:</label>
                        <p>{item.other}</p>
                      </div>
                      <div>
                        <label>Accident and citations:</label>
                        <p>{item.accidents_and_citations}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.upload_container}>
                <h2>Upload Status</h2>
                <div>
                  <label>Single licence disclosure</label>
                  <div
                    className={styles.checkBox}
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor:
                        props.file.license_disclosure == "none" ||
                        null ||
                        undefined
                          ? "red"
                          : "green",
                    }}
                  ></div>
                </div>
                <div>
                  <label>Copy of valid driver's licence with photo</label>
                  <div
                    className={styles.checkBox}
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor:
                        props.file.driving_license == "none" ||
                        null ||
                        undefined
                          ? "red"
                          : "green",
                    }}
                  ></div>
                </div>
                <div>
                  <label>Drivers Abstract Request form</label>
                  <div
                    className={styles.checkBox}
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor:
                        props.file.abstract_request_form == "none" ||
                        null ||
                        undefined
                          ? "red"
                          : "green",
                    }}
                  ></div>
                </div>
                <div>
                  <label>Current abstract(within 12 months)</label>
                  <div
                    className={styles.checkBox}
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor:
                        props.file.current_abstract == "none" ||
                        null ||
                        undefined
                          ? "red"
                          : "green",
                    }}
                  ></div>{" "}
                </div>
                <div>
                  <label>Consent to personal investigation</label>
                  <div
                    className={styles.checkBox}
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor:
                        props.file.personal_investigation_consent == "none" ||
                        null ||
                        undefined
                          ? "red"
                          : "green",
                    }}
                  ></div>
                </div>
                <div>
                  <label>Criminal record check</label>
                  <div
                    className={styles.checkBox}
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor:
                        props.file.criminal_record_check == "none" ||
                        null ||
                        undefined
                          ? "red"
                          : "green",
                    }}
                  ></div>
                </div>
                <div>
                  <label>Pre-employment Driver's road test</label>
                  <div
                    className={styles.checkBox}
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor:
                        props.file.pre_employment_road_test == "none" ||
                        null ||
                        undefined
                          ? "red"
                          : "green",
                    }}
                  ></div>
                </div>
                <div>
                  <label>Employment application</label>
                  <div
                    className={styles.checkBox}
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor:
                        props.file.employment_application == "none" ||
                        null ||
                        undefined
                          ? "red"
                          : "green",
                    }}
                  ></div>
                </div>
                <div>
                  <label>
                    Release and authorization to contact previous employer
                  </label>
                  <div
                    className={styles.checkBox}
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor:
                        props.file.release_and_authorization == "none" ||
                        null ||
                        undefined
                          ? "red"
                          : "green",
                    }}
                  ></div>
                </div>
                <div>
                  <label>Reference checks</label>
                  <div
                    className={styles.checkBox}
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor:
                        props.file.reference_checks == "none" ||
                        null ||
                        undefined
                          ? "red"
                          : "green",
                    }}
                  ></div>
                </div>
                <div>
                  <label>Driver statement of onduty hours</label>
                  <div
                    className={styles.checkBox}
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor:
                        props.file.on_duty_hours_statement == "none" ||
                        null ||
                        undefined
                          ? "red"
                          : "green",
                    }}
                  ></div>
                </div>
                <div>
                  <label>Certificate of violations(once every 6months)</label>
                  <div
                    className={styles.checkBox}
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor:
                        props.file.certificate_of_violation == "none" ||
                        null ||
                        undefined
                          ? "red"
                          : "green",
                    }}
                  ></div>
                </div>
                <div>
                  <label>Annual Driver Performance Reviews</label>
                  <div
                    className={styles.checkBox}
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor:
                        props.file.certificate_of_road_test == "none" ||
                        null ||
                        undefined
                          ? "red"
                          : "green",
                    }}
                  ></div>
                </div>
                <div>
                  <label>Training</label>
                  <div
                    className={styles.checkBox}
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor:
                        props.file.training == "none" || null || undefined
                          ? "red"
                          : "green",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        <div className={styles.button_container}>
          <button onClick={handleDisplay} className="button_general">
            Close
          </button>
          <button className="button_general">Update</button>
        </div>
      </div>
    </div>
  );
};

export default ModalDrivers;
