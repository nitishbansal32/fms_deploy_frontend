import styles from "./Accident.module.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { useEffect, useState, useContext } from "react";

import modalbg from "../../../src/Images/modalAccidentBg.svg";

const ModalAccident = (props) => {
  const { display, setDisplay } = useContext(UserContext);

  const navigate = useNavigate();

  console.log(props.modalAccident);

  const handleDisplay = () => {
    setDisplay(false);
  };

  const handleUpdate = () => {
    navigate("/updateAccident");
    setDisplay(false);
  };

  return (
    <div className={styles.main_modal_container}>
      <div className={styles.modal_container}>
        {props.modalAccident &&
          props.modalAccident.map((item) => (
            <div className={styles.wrap_container}>
              <div className={styles.content}>
                <h3>Accident number</h3>
                <p>{item.accident_number}</p>
              </div>
              <hr style={{ width: "100%" }} />
              <div className={styles.content}>
                <h3>Accident date</h3>
                <p>{item.accident_date.substr(0, 10)}</p>
              </div>
              <hr style={{ width: "100%" }} />

              <div className={styles.content}>
                <h3>Accident time</h3>
                <p>{item.accident_time}</p>
              </div>
              <hr style={{ width: "100%" }} />

              <div className={styles.content}>
                <h3>Driver name</h3>
                <p>{item.driver_name}</p>
              </div>
              <hr style={{ width: "100%" }} />

              <div className={styles.content}>
                <h3>Driver licence number</h3>
                <p>{item.driver_licene_number}</p>
              </div>
              <hr style={{ width: "100%" }} />

              <div className={styles.content}>
                <h3>Tractor number</h3>
                <p>{item.tractor_number}</p>
              </div>
              <hr style={{ width: "100%" }} />

              <div className={styles.content}>
                <h3>Location</h3>
                <p>{item.location}</p>
              </div>
              <hr style={{ width: "100%" }} />

              <div className={styles.content}>
                <h3>Accident type</h3>
                <p>{item.accident_type}</p>
              </div>
              <hr style={{ width: "100%" }} />

              <div className={styles.content}>
                <h3>Damage</h3>
                <p>{item.damage}</p>
              </div>
              <hr style={{ width: "100%" }} />

              <div className={styles.content}>
                <h3>Towing</h3>
                <p>{item.towing}</p>
              </div>
              <hr style={{ width: "100%" }} />

              <div className={styles.content}>
                <h3>Police report number</h3>
                <p>{item.police_report_number}</p>
              </div>
              <hr style={{ width: "100%" }} />

              <div className={styles.content}>
                <h3>Police officer</h3>
                <p>{item.police_officer}</p>
              </div>
              <hr style={{ width: "100%" }} />

              <div className={styles.content}>
                <h3>Company accident report</h3>
                <p>{item.company_accident_report}</p>
              </div>
              <hr style={{ width: "100%" }} />

              <div className={styles.content}>
                <h3>Claim number</h3>
                <p>{item.claim_number}</p>
              </div>
              <hr style={{ width: "100%" }} />

              <div className={styles.content}>
                <h3>Adjuster</h3>
                <p>{item.adjuster}</p>
              </div>
              <hr style={{ width: "100%" }} />

              <div className={styles.content}>
                <h3>Driver charged</h3>
                <p>{item.driver_charged}</p>
              </div>
              <hr style={{ width: "100%" }} />

              <div className={styles.content}>
                <h3>Action taken</h3>
                <p>{item.action_taken}</p>
              </div>
              <hr style={{ width: "100%" }} />

              <div className={styles.content}>
                <h3>Cause of accident</h3>
                <p>{item.cause_of_accident}</p>
              </div>
              <hr style={{ width: "100%" }} />

              <div className={styles.content}>
                <h3>Preventable</h3>
                <p>{item.preventable}</p>
              </div>
              <hr style={{ width: "100%" }} />

              <div className={styles.content}>
                <h3>Const</h3>
                <p>{item.const}</p>
              </div>
              <hr style={{ width: "100%" }} />

              <div className={styles.content}>
                <h3>Comments</h3>
                <p>{item.comments}</p>
              </div>
              <hr style={{ width: "100%" }} />

              <div className={styles.content}>
                <h3>Driver statement</h3>
                <p>{item.driver_statement}</p>
              </div>
              <hr style={{ width: "100%" }} />
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

export default ModalAccident;
