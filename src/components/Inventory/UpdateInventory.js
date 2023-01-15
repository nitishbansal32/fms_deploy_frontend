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
    inventoryData,
    setInventoryData,
    modalColor,
    setModalColor,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const [status, setStatus] = useState("");

  const [postdata, setPostData] = useState("");

  const arrInventoryData = [inventoryData];

  const [validator, setValidator] = useState({
    VinValidate: false,
  });

  const ValidateFunc = () => {
    //VIN Validator
    if (!(data.VIN === 17)) {
      setValidator((prev) => ({
        ...prev,
        [`VinValidate`]: true,
      }));
    }
  };

  const [data, setData] = useState({
    unit: inventoryData.unit,
    year: inventoryData.year,
    made_by: inventoryData.made_by,
    color: inventoryData.color,
    description: inventoryData.description,
    VIN: inventoryData.VIN,
    ELD: inventoryData.ELD,
    terminal: inventoryData.terminal,
    ownership: inventoryData.ownership,
    licence_plate: inventoryData.licence_plate,
    number_of_axles: inventoryData.number_of_axles,
    weight: inventoryData.weight,
    tyre_size: inventoryData.tyre_size,
    standard_job: inventoryData.standard_job,
    annual_inspection: inventoryData.annual_inspection,
    safety_expiry_date: inventoryData.safety_expiry_date,
    status: inventoryData.status,
    plate_expiry_date: inventoryData.plate_expiry_date,
    days_remaining_for_next_inspection:
      inventoryData.days_remaining_for_next_inspection,
    mechanical_notes: inventoryData.mechanical_notes,
    maintenance_duration: inventoryData.maintenance_duration,
    next_maintenance_at: inventoryData.next_maintenance_at,
    last_maintenance_at: inventoryData.last_maintenance_at,
    maintenance_delay: inventoryData.maintenance_delay,
    days_remaining_for_next_inspection:
      inventoryData.days_remaining_for_next_inspection,
    type: inventoryData.type,
    // maintenance_documents: inventoryData.maintenance_documents,
  });

  const inputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const body = {
    unit: data.unit,
    year: data.year,
    made_by: data.made_by,
    color: data.color,
    description: data.description,
    VIN: data.VIN,
    ELD: data.ELD,
    terminal: data.terminal,
    ownership: data.ownership,
    licence_plate: data.licence_plate,
    number_of_axles: data.number_of_axles,
    weight: data.weight,
    tyre_size: data.tyre_size,
    standard_job: data.standard_job,
    annual_inspection: data.annual_inspection,
    safety_expiry_date: data.safety_expiry_date,
    status: data.status,
    plate_expiry_date: data.plate_expiry_date,
    days_remaining_for_next_inspection: data.days_remaining_for_next_inspection,
    mechanical_notes: data.mechanical_notes,
    maintenance_duration: data.maintenance_duration,
    next_maintenance_at: data.next_maintenance_at,
    last_maintenance_at: data.last_maintenance_at,
    maintenance_delay: data.maintenance_delay,
    days_remaining_for_next_inspection: data.days_remaining_for_next_inspection,
    type: data.type,
    maintenance_documents: data.maintenance_documents,
  };

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg("Updating equipment information...");
    setModal(true);
    setModalColor("green");

    Axios.patch(
      `https://lc-backend-v2.herokuapp.com/api/v1/LC/tractors/${inventoryData.unit}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => {
        setStatus(response.status);
        setMsg("Equipment updated!");
        setModal(true);
        setModalColor("green");
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.data.msg == "Path `unit` is required.") {
          setMsg("Unit number is required!");
          setModal(true);
          setModalColor("red");
        } else if (
          err.response.data.msg ==
          "Duplicate value entered for unit field, please choose another value"
        ) {
          setMsg("Unit number already exists!");
          setModal(true);
          setModalColor("red");
        } else if (!(data.VIN === 17)) {
          setModal(true);
          setModalColor("red");
          setMsg("VIN should be min. 17 digits!");
        } else {
          setMsg("Internal error!");
          setModal(true);
          setModalColor("red");
        }
      });
  };

  const handleBack = () => {
    navigate("/inventory", { replace: true });
    setModal(false);
  };

  const permissionHandler = () => {
    navigate("/inventory", { replace: true });
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
                <h1>Update equipment information</h1>

                <div className={styles.table_container}>
                  {/* {arrInventoryData.map((item) => (
                    <> */}
                  <div className={styles.above_container}>
                    <div className={styles.table_content}>
                      <label htmlFor="">*Unit :</label>
                      <input
                        type="text"
                        placeholder="E.g. 123abc"
                        name="unit"
                        onChange={inputChange}
                        value={data.unit}
                        required
                      />
                    </div>
                    <div className={styles.table_content}>
                      <label htmlFor="">*Year: </label>
                      <input
                        type="text"
                        placeholder="E.g. 2022"
                        name="year"
                        onChange={inputChange}
                        value={data.year}
                        disabled
                      />
                    </div>
                    <div className={styles.table_content}>
                      <label htmlFor="">*Make:</label>
                      {/* <input
                      type="text"
                      placeholder="Made by"
                      name="made_by"
                      onChange={inputChange}
                      value={data.made_by}
                      
                    /> */}
                      <select
                        name="made_by"
                        id=""
                        onChange={inputChange}
                        value={data.made_by}
                        disabled
                      >
                        <option value="Volvo" selected>
                          Volvo
                        </option>
                        <option value="International">International</option>
                        <option value="Freightliner">Freightliner</option>
                        <option value="Toyota">Toyota</option>
                      </select>
                    </div>
                    <div className={styles.table_content}>
                      <label htmlFor="">*Type:</label>

                      <select
                        name="type"
                        id=""
                        onChange={inputChange}
                        value={data.type}
                        required
                        disabled
                      >
                        <option value="Tractor" selected="selected">
                          Tractor
                        </option>
                        <option value="Trailer">Trailer</option>
                      </select>
                    </div>
                    <div className={styles.table_content}>
                      <label htmlFor="">*Color:</label>
                      <input
                        type="text"
                        placeholder="E.g. red"
                        name="color"
                        onChange={inputChange}
                        value={data.color}
                        required
                      />
                    </div>
                    <div className={styles.table_content}>
                      <label htmlFor="">*VIN:</label>

                      <input
                        type="text"
                        placeholder="17 digits"
                        name="VIN"
                        minlength="17"
                        maxlength="17"
                        onChange={inputChange}
                        value={data.VIN}
                        disabled
                      />
                    </div>
                    <div className={styles.table_content}>
                      <label htmlFor="">Status:</label>
                      <select
                        name="status"
                        id=""
                        onChange={inputChange}
                        value={data.status}
                        // default="active"
                      >
                        <option value="active" selected="selected">
                          Active
                        </option>
                        <option value="inactive">Inactive</option>
                        <option value="safety due">Safety due</option>
                      </select>
                    </div>
                    <div className={styles.table_content}>
                      <label htmlFor="">Description</label>
                      <input
                        type="text"
                        placeholder="E.g. trailer is....."
                        name="description"
                        onChange={inputChange}
                        value={data.description}
                      />
                    </div>

                    <div className={styles.table_content}>
                      <label htmlFor="">ELD:</label>

                      <input
                        type="text"
                        placeholder="Enter ELD"
                        name="ELD"
                        onChange={inputChange}
                        value={data.ELD}
                      />
                    </div>
                    <div className={styles.table_content}>
                      <label htmlFor="">Terminal:</label>

                      <input
                        type="text"
                        placeholder="Enter terminal"
                        name="terminal"
                        onChange={inputChange}
                        value={data.terminal}
                      />
                    </div>
                    <div className={styles.table_content}>
                      <label htmlFor="">Ownership:</label>

                      <input
                        type="text"
                        placeholder="E.g. David"
                        name="ownership"
                        onChange={inputChange}
                        value={data.ownership}
                      />
                    </div>
                    <div className={styles.table_content}>
                      <label htmlFor="shift">Licence plate:</label>
                      <input
                        type="text"
                        name="licence_plate"
                        placeholder="E.g. ABCD1234"
                        onChange={inputChange}
                        value={data.licence_plate}
                      />
                    </div>
                    <div className={styles.table_content}>
                      <label htmlFor="">Number of axles:</label>

                      <input
                        type="number"
                        min="0"
                        placeholder="E.g. 2"
                        name="number_of_axles"
                        onChange={inputChange}
                        value={data.number_of_axles}
                      />
                    </div>
                    <div className={styles.table_content}>
                      <label htmlFor="">Weight(Kg):</label>

                      <input
                        type="number"
                        min="0"
                        placeholder="E.g. 15"
                        name="weight"
                        onChange={inputChange}
                        value={data.weight}
                      />
                    </div>
                    <div className={styles.table_content}>
                      <label htmlFor="">Tyre Size:</label>

                      <input
                        type="text"
                        placeholder="E.g. 11R25"
                        name="tyre_size"
                        onChange={inputChange}
                        value={data.tyre_size}
                      />
                    </div>
                  </div>

                  <div className={styles.special_container}>
                    <div className={styles.table_content}>
                      <label htmlFor="">*Annual safety expiry:</label>
                      <input
                        type="date"
                        placeholder="Enter safety expiry date"
                        data-date-format="YYYY MM DD"
                        name="safety_expiry_date"
                        onChange={inputChange}
                        value={
                          data.safety_expiry_date
                            ? data.safety_expiry_date.substr(0, 10)
                            : ""
                        }
                        required
                      />
                    </div>
                    <div className={styles.table_content}>
                      <label htmlFor="">*Maintainence duration(days):</label>

                      <input
                        type="number"
                        min="0"
                        placeholder="E.g. 90"
                        name="maintenance_duration"
                        onChange={inputChange}
                        value={data.maintenance_duration}
                        required
                      />
                    </div>
                    <div className={styles.table_content}>
                      <label htmlFor="">Next maintainence at:</label>
                      <input
                        type="date"
                        data-date-format="YYYY MM DD"
                        placeholder="Enter date"
                        name="next_maintenance_at"
                        onChange={inputChange}
                        value={
                          data.next_maintenance_at
                            ? data.next_maintenance_at.substr(0, 10)
                            : ""
                        }
                        disabled
                      />
                    </div>
                    <div className={styles.table_content}>
                      <label htmlFor="">*Annual inspection:</label>

                      <input
                        type="date"
                        data-date-format="YYYY MM DD"
                        placeholder="Enter annual inspection"
                        name="annual_inspection"
                        onChange={inputChange}
                        value={
                          data.annual_inspection
                            ? data.annual_inspection.substr(0, 10)
                            : ""
                        }
                        required
                      />
                    </div>

                    <div className={styles.table_content}>
                      <label htmlFor="">*Plate expiry:</label>

                      <input
                        type="date"
                        data-date-format="YYYY MM DD"
                        placeholder="Enter plat expiry date"
                        name="plate_expiry_date"
                        onChange={inputChange}
                        value={
                          data.plate_expiry_date
                            ? data.plate_expiry_date.substr(0, 10)
                            : ""
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.below_container}>
                    <div className={styles.table_content}>
                      <label htmlFor="">
                        Days remaining for next inspection:
                      </label>

                      <input
                        type="text"
                        placeholder=""
                        name="days_remaining_for_next_inspection"
                        onChange={inputChange}
                        value={data.days_remaining_for_next_inspection}
                        disabled
                      />
                    </div>
                    <div className={styles.table_content}>
                      <label htmlFor="">Mechanical notes:</label>

                      <textarea
                        rows="2"
                        cols="25"
                        type="text"
                        placeholder="E.g. Axles are.."
                        name="mechanical_notes"
                        onChange={inputChange}
                        value={data.mechanical_notes}
                      />
                    </div>

                    <div className={styles.table_content}>
                      <label htmlFor="">Last maintainence at:</label>
                      <input
                        type="date"
                        data-date-format="YYYY MM DD"
                        placeholder="Enter date"
                        name="last_maintenance_at"
                        onChange={inputChange}
                        value={
                          data.last_maintenance_at
                            ? data.last_maintenance_at.substr(0, 10)
                            : ""
                        }
                        disabled
                      />
                    </div>

                    <div className={styles.table_content}>
                      <label htmlFor="">Maintainence delay:</label>
                      <input
                        type="number"
                        min="0"
                        placeholder="E.g. 2"
                        name="maintenance_delay"
                        onChange={inputChange}
                        value={data.maintenance_delay}
                        disabled
                      />
                    </div>
                    <div className={styles.table_content}>
                      <label htmlFor="">Standard job:</label>

                      <input
                        type="text"
                        placeholder="Enter standard job"
                        name="standard_job"
                        onChange={inputChange}
                        value={data.standard_job}
                      />
                    </div>
                    <div className={styles.table_content}>
                      <label htmlFor="">Maintainence documents</label>

                      <input
                        type="file"
                        placeholder="Enter standard job"
                        name="maintenance_documents"
                        onChange={inputChange}
                        value={data.maintenance_documents}
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
