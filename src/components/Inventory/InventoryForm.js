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

  const [postdata, setPostData] = useState("");

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
    safety_expiry_date: "",
    plate_expiry_date: "",
    days_remaining_for_next_inspection: "",
    mechanical_notes: "",
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
    supervisor_notes: data.supervisor_notes,
    first_PR: data.first_PR,
    semi_annual_PR: data.semi_annual_PR,
    CVOR_points: data.CVOR_points,
    employee_notes: data.employee_notes,
    other: data.other,
    accidents_and_citations: data.accidents_and_citations,
  };

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

  return (
    <>
      {/* {isLoggedIn ? ( */}
      <div className="wrapper_container">
        <Navbar />
        {!(role === "employee") ? (
          <div className={styles.main_container}>
            <form onSubmit={handleSubmit} action="">
              <div className={styles.table_wrapper_container}>
                <h1>Register Equipments</h1>

                <div className={styles.table_container}>
                  <div className={styles.table_content}>
                    <label htmlFor="">unit :</label>
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
                    <label htmlFor="">Made By:</label>
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
                    <label htmlFor="">description</label>
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
                    <label htmlFor="">terminal:</label>

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
                    <label htmlFor="">Number of Axles:</label>

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
                    <label htmlFor="">Supervisor:</label>

                    <input
                      type="text"
                      placeholder="Enter supervisor"
                      name="supervisor"
                      onChange={inputChange}
                      value={data.supervisor}
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
