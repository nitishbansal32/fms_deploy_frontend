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

  const navigate = useNavigate();

  const [yearStyle, setYearStyle] = useState(false);

  const [validator, setValidator] = useState({
    AnnualInsp: false,
    NextAnnualInsp: false,
    SafetyExpiry: false,
    PlateExpiry: false,
  });

  const ValidateFunc = () => {
    //Annual Inspection
    if (
      !/\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/.test(
        data.annual_inspection
      )
    ) {
      setValidator((prev) => ({
        ...prev,
        [`AnnualInsp`]: true,
      }));
    }

    //Next Annual Inspection
    if (
      !/\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/.test(
        data.next_annual_inspection
      )
    ) {
      setValidator((prev) => ({
        ...prev,
        [`NextAnnualInsp`]: true,
      }));
    }

    //Safety Expiry Date
    if (
      !/\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/.test(
        data.safety_expiry_date
      )
    ) {
      setValidator((prev) => ({
        ...prev,
        [`SafetyExpiry`]: true,
      }));
    }

    //Plate Expiry Date
    if (
      !/\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/.test(
        data.plate_expiry_date
      )
    ) {
      setValidator((prev) => ({
        ...prev,
        [`PlateExpiry`]: true,
      }));
    }
  };

  const [data, setData] = useState({
    unit: "",
    year: "",
    made_by: "",
    color: "",
    description: "",
    VIN: "",
    ELD: "",
    terminal: "",
    ownership: "",
    licence_plate: "",
    number_of_axles: "",
    weight: "",
    tyre_size: "",
    standard_job: "",
    annual_inspection: "",
    next_annual_inspection: "",
    safety_expiry_date: "",
    status: "",
    plate_expiry_date: "",
    // PM1: "",
    // PM2: "",
    // PM3: "",
    // days_remaining_for_next_inspection: "",
    mechanical_notes: "",
    maintenance_duration: "",
  });

  const inputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name);
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
    next_annual_inspection: data.next_annual_inspection,
    safety_expiry_date: data.safety_expiry_date,
    status: data.status,
    plate_expiry_date: data.plate_expiry_date,
    // PM1: data.PM1,
    // PM2: data.PM2,
    // PM3: data.PM3,
    // days_remaining_for_next_inspection: data.days_remaining_for_next_inspection,
    mechanical_notes: data.mechanical_notes,
    maintenance_duration: data.maintenance_duration,
  };

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ValidateFunc();
    Axios.post(
      `https://lc-backend-v2.herokuapp.com/api/v1/LC/tractors/createTractor`,
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
    navigate("/inventory", { replace: true });
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
                <h1>Add new equipment</h1>
                <div className={styles.table_container}>
                  <div className={styles.table_content}>
                    <label htmlFor="">Unit :</label>
                    <input
                      type="text"
                      placeholder="Enter unit "
                      name="unit"
                      onChange={inputChange}
                      value={data.unit}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Year: </label>
                    <input
                      type="text"
                      placeholder="Enter year"
                      name="year"
                      onChange={inputChange}
                      value={data.year}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Made by:</label>
                    <input
                      type="text"
                      placeholder="Made by"
                      name="made_by"
                      onChange={inputChange}
                      value={data.made_by}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Color:</label>
                    <input
                      type="email"
                      placeholder="Enter color"
                      name="color"
                      onChange={inputChange}
                      value={data.color}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Description</label>
                    <input
                      type="text"
                      placeholder="Enter description"
                      name="description"
                      onChange={inputChange}
                      value={data.description}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">VIN:</label>

                    <input
                      type="text"
                      placeholder="Enter VIN"
                      name="VIN"
                      onChange={inputChange}
                      value={data.VIN}
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
                      placeholder="Enter ownership"
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
                      placeholder="Enter licence plate"
                      onChange={inputChange}
                      value={data.licence_plate}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Number of axles:</label>

                    <input
                      type="text"
                      placeholder="Enter number of axlers"
                      name="number_of_axles"
                      onChange={inputChange}
                      value={data.number_of_axles}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Weight:</label>

                    <input
                      type="text"
                      placeholder="Enter weight"
                      name="weight"
                      onChange={inputChange}
                      value={data.weight}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Tyre size:</label>

                    <input
                      type="text"
                      placeholder="Enter tyre size"
                      name="tyre_size"
                      onChange={inputChange}
                      value={data.tyre_size}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Standard job:</label>

                    <input
                      type="text"
                      placeholder="Enter standard job"
                      name="tyre_size"
                      onChange={inputChange}
                      value={data.tyre_size}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Annual inspection:</label>

                    <input
                      type="text"
                      placeholder="Enter annual inspection"
                      name="annual_inspection"
                      onChange={inputChange}
                      value={data.annual_inspection}
                      style={{ borderColor: validator.AnnualInsp ? "red" : "" }}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Next annual inspection:</label>

                    <input
                      type="text"
                      placeholder="Enter next annual inspection"
                      name="next_annual_inspection"
                      onChange={inputChange}
                      value={data.next_annual_inspection}
                      style={{
                        borderColor: validator.NextAnnualInsp ? "red" : "",
                      }}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Safety expiry date:</label>

                    <input
                      type="text"
                      placeholder="Enter safety expiry date"
                      name="safety_expiry_date"
                      onChange={inputChange}
                      value={data.safety_expiry_date}
                      style={{
                        borderColor: validator.SafetyExpiry ? "red" : "",
                      }}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Status:</label>
                    <select
                      name="status"
                      id=""
                      onChange={inputChange}
                      value={data.status}
                    >
                      <option value="active">active</option>
                      <option value="inactive">inactive</option>
                      <option value="safety due">safety due</option>
                    </select>
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Plate expiry date:</label>

                    <input
                      type="text"
                      placeholder="Enter plate expiry date"
                      name="plate_expiry_date"
                      onChange={inputChange}
                      value={data.plate_expiry_date}
                      style={{
                        borderColor: validator.PlateExpiry ? "red" : "",
                      }}
                    />
                  </div>
                  {/* <div className={styles.table_content}>
                    <label htmlFor="">PM1:</label>

                    <input
                      type="text"
                      placeholder="Enter PM1"
                      name="PM1"
                      onChange={inputChange}
                      value={data.PM1}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">PM2:</label>

                    <input
                      type="text"
                      placeholder="Enter PM2"
                      name="PM2"
                      onChange={inputChange}
                      value={data.PM2}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">PM3:</label>

                    <input
                      type="text"
                      placeholder="Enter PM3"
                      name="PM3"
                      onChange={inputChange}
                      value={data.PM3}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">
                      Days remaining for next inspection:
                    </label>

                    <input
                      type="text"
                      placeholder="Enter days remaining for next inspection"
                      name="days_remaining_for_next_inspection"
                      onChange={inputChange}
                      value={data.days_remaining_for_next_inspection}
                    />
                  </div> */}
                  <div className={styles.table_content}>
                    <label htmlFor="">Mechanical notes:</label>

                    <input
                      type="text"
                      placeholder="Enter mechanical notes"
                      name="mechanical_notes"
                      onChange={inputChange}
                      value={data.mechanical_notes}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Maintainence duration:</label>

                    <input
                      type="text"
                      placeholder="Enter maintainence duration"
                      name="maintenance_duration"
                      onChange={inputChange}
                      value={data.maintenance_duration}
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
