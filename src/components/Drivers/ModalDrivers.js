import styles from "./Drivers.module.css";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { useEffect, useState, useContext } from "react";
import Logo from "../../../src/Images/DriversLogo.svg";

const ModalDrivers = (props) => {
  const { display, setDisplay, setStatus, setMsg, setModal } =
    useContext(UserContext);
  const url = "";
  // const [file, setFile] = useState("");

  const navigate = useNavigate();

  const handleDisplay = () => {
    setDisplay(false);
  };

  //For profile image
  const [file, setFile] = useState({
    profile_picture: "",
  });

  const [profileUrl, setProfileUrl] = useState("");

  const [checkField, setCheckField] = useState("");

  const fileInputChange = (e) => {
    setFile({
      ...file,
      [`profile_picture`]: e.target.files[0],
    });
  };

  const formData = new FormData();
  // console.log(props.modalDrivers[0].employee_name);

  formData.append("profile_picture", file.profile_picture);

  const profilePicUpload = (e) => {
    e.preventDefault();

    Axios.patch(
      `https://lc-backend-v2.herokuapp.com/api/v1/LC/drivers/${
        props.modalDrivers[0].employee_name
          ? props.modalDrivers[0].employee_name
          : ""
      }`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    )
      .then((response) => {
        // setStatus(response.status);
        setProfileUrl(response.data.driver.profile_picture);
        setMsg("Profile pic uploaded!");
        setModal(true);
      })
      .catch((err) => {
        console.log(err);
        // setMsg("Check fields!!");
        // setModal(true);
      });
  };

  //End of profile image

  const handleUpdate = () => {
    navigate("/updateDriver");
    setDisplay(false);
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
                      <div className={styles.img_container}>
                        {!(item.profile_picture == "none") ? (
                          <img
                            src={item.profile_picture}
                            alt=""
                            className={styles.driver_image}
                          />
                        ) : (
                          <form action="" onSubmit={profilePicUpload}>
                            <div className={styles.profile_picture_container}>
                              {profileUrl ? (
                                <img src={profileUrl} alt="" />
                              ) : (
                                <>
                                  <p>Add Image</p>
                                  <input
                                    type="file"
                                    className={styles.profile_input}
                                    onChange={fileInputChange}
                                    style={{
                                      zIndex: file.profile_picture ? "1" : "4",
                                    }}
                                  />
                                  <button
                                    className={styles.upload_button}
                                    style={{
                                      zIndex: file.profile_picture ? "4" : "1",
                                    }}
                                  >
                                    Submit
                                  </button>
                                </>
                              )}
                            </div>
                          </form>
                        )}
                      </div>
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

                <div
                  onClick={(event) =>
                    props.file.license_disclosure == "none"
                      ? "none"
                      : props.file.license_disclosure == null
                      ? "none"
                      : props.file.license_disclosure == undefined
                      ? "none"
                      : window.open(
                          `${props.file.license_disclosure}`,
                          "_blank"
                        )
                  }
                >
                  <label>Single licence disclosure</label>
                  <div
                    className={styles.checkBox}
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor:
                        props.file.license_disclosure == "none"
                          ? "red"
                          : props.file.license_disclosure == null
                          ? "red"
                          : props.file.license_disclosure == undefined
                          ? "red"
                          : "green",
                    }}
                  ></div>
                </div>

                <div
                  onClick={(event) =>
                    props.file.driving_license == "none"
                      ? "none"
                      : props.file.driving_license == null
                      ? "none"
                      : props.file.driving_license == undefined
                      ? "none"
                      : window.open(`${props.file.driving_license}`, "_blank")
                  }
                >
                  <label>Copy of valid driver's licence with photo</label>
                  <div
                    className={styles.checkBox}
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor:
                        props.file.driving_license == "none"
                          ? "red"
                          : props.file.driving_license == null
                          ? "red"
                          : props.file.driving_license == undefined
                          ? "red"
                          : "green",
                    }}
                  ></div>
                </div>

                <div
                  onClick={(event) =>
                    props.file.abstract_request_form == "none"
                      ? "none"
                      : props.file.abstract_request_form == null
                      ? "none"
                      : props.file.abstract_request_form == undefined
                      ? "none"
                      : window.open(
                          `${props.file.abstract_request_form}`,
                          "_blank"
                        )
                  }
                >
                  <label>Drivers Abstract Request form</label>
                  <div
                    className={styles.checkBox}
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor:
                        props.file.abstract_request_form == "none"
                          ? "red"
                          : props.file.abstract_request_form == null
                          ? "red"
                          : props.file.abstract_request_form == undefined
                          ? "red"
                          : "green",
                    }}
                  ></div>
                </div>
                <div
                  onClick={(event) =>
                    props.file.current_abstract == "none"
                      ? "none"
                      : props.file.current_abstract == null
                      ? "none"
                      : props.file.current_abstract == undefined
                      ? "none"
                      : window.open(`${props.file.current_abstract}`, "_blank")
                  }
                >
                  <label>Current abstract(within 12 months)</label>
                  <div
                    className={styles.checkBox}
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor:
                        props.file.current_abstract == "none"
                          ? "red"
                          : props.file.current_abstract == null
                          ? "red"
                          : props.file.current_abstract == undefined
                          ? "red"
                          : "green",
                    }}
                  ></div>{" "}
                </div>
                <div
                  onClick={(event) =>
                    props.file.personal_investigation_consent == "none"
                      ? "none"
                      : props.file.personal_investigation_consent == null
                      ? "none"
                      : props.file.personal_investigation_consent == undefined
                      ? "none"
                      : window.open(
                          `${props.file.personal_investigation_consent}`,
                          "_blank"
                        )
                  }
                >
                  <label>Consent to personal investigation</label>
                  <div
                    className={styles.checkBox}
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor:
                        props.file.personal_investigation_consent == "none"
                          ? "red"
                          : props.file.personal_investigation_consent == null
                          ? "red"
                          : props.file.personal_investigation_consent ==
                            undefined
                          ? "red"
                          : "green",
                    }}
                  ></div>
                </div>
                <div
                  onClick={(event) =>
                    props.file.criminal_record_check == "none"
                      ? "none"
                      : props.file.criminal_record_check == null
                      ? "none"
                      : props.file.criminal_record_check == undefined
                      ? "none"
                      : window.open(
                          `${props.file.criminal_record_check}`,
                          "_blank"
                        )
                  }
                >
                  <label>Criminal record check</label>
                  <div
                    className={styles.checkBox}
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor:
                        props.file.criminal_record_check == "none"
                          ? "red"
                          : props.file.criminal_record_check == null
                          ? "red"
                          : props.file.criminal_record_check == undefined
                          ? "red"
                          : "green",
                    }}
                  ></div>
                </div>
                <div
                  onClick={(event) =>
                    props.file.pre_employment_road_test == "none"
                      ? "none"
                      : props.file.pre_employment_road_test == null
                      ? "none"
                      : props.file.pre_employment_road_test == undefined
                      ? "none"
                      : window.open(
                          `${props.file.pre_employment_road_test}`,
                          "_blank"
                        )
                  }
                >
                  <label>Pre-employment Driver's road test</label>
                  <div
                    className={styles.checkBox}
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor:
                        props.file.pre_employment_road_test == "none"
                          ? "red"
                          : props.file.pre_employment_road_test == null
                          ? "red"
                          : props.file.pre_employment_road_test == undefined
                          ? "red"
                          : "green",
                    }}
                  ></div>
                </div>
                <div
                  onClick={(event) =>
                    props.file.employment_application == "none"
                      ? "none"
                      : props.file.employment_application == null
                      ? "none"
                      : props.file.employment_application == undefined
                      ? "none"
                      : window.open(
                          `${props.file.employment_application}`,
                          "_blank"
                        )
                  }
                >
                  <label>Employment application</label>
                  <div
                    className={styles.checkBox}
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor:
                        props.file.employment_application == "none"
                          ? "red"
                          : props.file.employment_application == null
                          ? "red"
                          : props.file.employment_application == undefined
                          ? "red"
                          : "green",
                    }}
                  ></div>
                </div>
                <div
                  onClick={(event) =>
                    props.file.release_and_authorization == "none"
                      ? "none"
                      : props.file.release_and_authorization == null
                      ? "none"
                      : props.file.release_and_authorization == undefined
                      ? "none"
                      : window.open(
                          `${props.file.release_and_authorization}`,
                          "_blank"
                        )
                  }
                >
                  <label>
                    Release and authorization to contact previous employer
                  </label>
                  <div
                    className={styles.checkBox}
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor:
                        props.file.release_and_authorization == "none"
                          ? "red"
                          : props.file.release_and_authorization == null
                          ? "red"
                          : props.file.release_and_authorization == undefined
                          ? "red"
                          : "green",
                    }}
                  ></div>
                </div>
                <div
                  onClick={(event) =>
                    props.file.reference_checks == "none"
                      ? "none"
                      : props.file.reference_checks == null
                      ? "none"
                      : props.file.reference_checks == undefined
                      ? "none"
                      : window.open(`${props.file.reference_checks}`, "_blank")
                  }
                >
                  <label>Reference checks</label>
                  <div
                    className={styles.checkBox}
                    style={{
                      width: "12px",
                      height: "12px",
                      //  || null || undefined)
                      backgroundColor:
                        props.file.reference_checks == "none"
                          ? "red"
                          : props.file.reference_checks == null
                          ? "red"
                          : props.file.reference_checks == undefined
                          ? "red"
                          : "green",
                    }}
                  ></div>
                </div>
                <div
                  onClick={(event) =>
                    props.file.on_duty_hours_statement == "none"
                      ? "none"
                      : props.file.on_duty_hours_statement == null
                      ? "none"
                      : props.file.on_duty_hours_statement == undefined
                      ? "none"
                      : window.open(
                          `${props.file.on_duty_hours_statement}`,
                          "_blank"
                        )
                  }
                >
                  <label>Driver statement of onduty hours</label>
                  <div
                    className={styles.checkBox}
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor:
                        props.file.on_duty_hours_statement == "none"
                          ? "red"
                          : props.file.on_duty_hours_statement == null
                          ? "red"
                          : props.file.on_duty_hours_statement == undefined
                          ? "red"
                          : "green",
                    }}
                  ></div>
                </div>
                <div
                  onClick={(event) =>
                    props.file.certificate_of_violation == "none"
                      ? "none"
                      : props.file.certificate_of_violation == null
                      ? "none"
                      : props.file.certificate_of_violation == undefined
                      ? "none"
                      : window.open(
                          `${props.file.certificate_of_violation}`,
                          "_blank"
                        )
                  }
                >
                  <label>Certificate of violations(once every 6months)</label>
                  <div
                    className={styles.checkBox}
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor:
                        props.file.certificate_of_violation == "none"
                          ? "red"
                          : props.file.certificate_of_violation == null
                          ? "red"
                          : props.file.certificate_of_violation == undefined
                          ? "red"
                          : "green",
                    }}
                  ></div>
                </div>
                <div
                  onClick={(event) =>
                    props.file.certificate_of_road_test == "none"
                      ? "none"
                      : props.file.certificate_of_road_test == null
                      ? "none"
                      : props.file.certificate_of_road_test == undefined
                      ? "none"
                      : window.open(
                          `${props.file.certificate_of_road_test}`,
                          "_blank"
                        )
                  }
                >
                  <label>Annual Driver Performance Reviews</label>
                  <div
                    className={styles.checkBox}
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor:
                        props.file.certificate_of_road_test == "none"
                          ? "red"
                          : props.file.certificate_of_road_test == null
                          ? "red"
                          : props.file.certificate_of_road_test == undefined
                          ? "red"
                          : "green",
                    }}
                  ></div>
                </div>
                <div
                  onClick={(event) =>
                    props.file.training == "none"
                      ? "none"
                      : props.file.training == null
                      ? "none"
                      : props.file.training == undefined
                      ? "none"
                      : window.open(`${props.file.training}`, "_blank")
                  }
                >
                  <label>Training</label>
                  <div
                    className={styles.checkBox}
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor:
                        props.file.training == "none"
                          ? "red"
                          : props.file.training == null
                          ? "red"
                          : props.file.training == undefined
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
          <button onClick={handleUpdate} className="button_general">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDrivers;
