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
    modalColor,
    setModalColor,
  } = useContext(UserContext);

  // const [status, setStatus] = useState("");

  const [postdata, setPostData] = useState("");

  const navigate = useNavigate();

  const [yearStyle, setYearStyle] = useState(false);

  const [validator, setValidator] = useState({
    VinValidate: false,
  });

  // const ValidateFunc = () => {
  //   //VIN Validator
  //   if (!(data.VIN === 17)) {
  //     setValidator((prev) => ({
  //       ...prev,
  //       [`VinValidate`]: true,
  //     }));
  //   } else if (data.VIN === 17) {
  //     setValidator((prev) => ({
  //       ...prev,
  //       [`VinValidate`]: false,
  //     }));
  //   }
  // };

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
    // next_annual_inspection: "",
    safety_expiry_date: "",
    safety_expiry_type: "",
    status: "",
    plate_expiry_date: "",
    // PM1: "",
    // PM2: "",
    // PM3: "",
    // days_remaining_for_next_inspection: "",
    mechanical_notes: "",
    maintenance_duration: "",
    type: "",
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
    made_by: `${!data.made_by ? "Volvo" : data.made_by}`,
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

    safety_expiry_type: `${
      !data.safety_expiry_type ? "Semi-Annual" : data.safety_expiry_type
    }`,
    safety_expiry_date: data.safety_expiry_date,
    status: `${!data.status ? "active" : data.status}`,
    plate_expiry_date: data.plate_expiry_date,

    mechanical_notes: data.mechanical_notes,
    maintenance_duration: data.maintenance_duration,
    type: `${!data.type ? "Tractor" : data.type}`,
  };

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ValidateFunc();
    setModal(true);
    setMsg("Adding new equipment....");
    setModalColor("green");

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
        // setStatus(response.status);
        setMsg("Equipment added!");
        setModal(true);
        setModalColor("green");
      })
      .catch((err) => {
        console.log(err.response);
        if (
          err.response.data.msg ==
          "Duplicate value entered for unit field, please choose another value"
        ) {
          setMsg("Unit number already exists!");
          setModal(true);
          setModalColor("red");
        } else if (!(data.VIN.length === 17)) {
          setModal(true);
          setModalColor("red");
          setMsg("VIN should be 17 digits!");
        } else if (
          err.response.data.msg == "CustomError is not a constructor"
        ) {
          setModal(true);
          setModalColor("red");
          setMsg("Set appropriate safety expiry date!");
        } else {
          setMsg("Try again after sometime!");
          setModal(true);
          setModalColor("red");
        }
      });
  };

  const handleBack = () => {
    navigate("/dashboard", { replace: true });
    setModal(false);
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
                <h1>Add new equipment</h1>
                <div className={styles.table_container}>
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
                      type="number"
                      placeholder="E.g. 2022"
                      minlength="4"
                      name="year"
                      onChange={inputChange}
                      value={data.year}
                      required
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
                      required
                    /> */}
                    <select
                      name="made_by"
                      id=""
                      onChange={inputChange}
                      value={data.made_by}
                      required
                    >
                      <option value="Volvo" selected="selected">
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
                      minlength="17"
                      maxlength="17"
                      name="VIN"
                      onChange={inputChange}
                      value={data.VIN}
                      required
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
                    <label htmlFor="">Description:</label>
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
                      placeholder="E.g. 15"
                      min="0"
                      name="weight"
                      onChange={inputChange}
                      value={data.weight}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Tyre size:</label>

                    <input
                      type="text"
                      placeholder="E.g. 11R25"
                      name="tyre_size"
                      onChange={inputChange}
                      value={data.tyre_size}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Standard job:</label>

                    <input
                      type="text"
                      placeholder="E.g. "
                      name="standard_job"
                      onChange={inputChange}
                      value={data.standard_job}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">*Annual inspection:</label>

                    <input
                      type="date"
                      placeholder="Enter annual inspection"
                      data-date-format="YYYY MM DD"
                      name="annual_inspection"
                      onChange={inputChange}
                      value={data.annual_inspection}
                      required
                    />
                  </div>
                  {/* <div className={styles.table_content}>
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
                  </div> */}
                  <div className={styles.table_content}>
                    <label htmlFor="">*Safety expiry type:</label>
                    <select
                      name="safety_expiry_type"
                      id=""
                      onChange={inputChange}
                      value={data.safety_expiry_type}
                    >
                      <option value="Semi-Annual" selected>
                        Semi annual
                      </option>
                      <option value="Annual">Annual</option>
                    </select>
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">*Safety expiry:</label>

                    <input
                      type="date"
                      placeholder="Enter safety expiry date"
                      data-date-format="YYYY MM DD"
                      name="safety_expiry_date"
                      onChange={inputChange}
                      value={data.safety_expiry_date}
                      required
                    />
                  </div>

                  <div className={styles.table_content}>
                    <label htmlFor="">*Plate expiry:</label>

                    <input
                      type="date"
                      placeholder="Enter plate expiry date"
                      name="plate_expiry_date"
                      data-date-format="YYYY MM DD"
                      onChange={inputChange}
                      value={data.plate_expiry_date}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">*Maintainence duration(days):</label>

                    <input
                      type="number"
                      placeholder="E.g. 90"
                      min="0"
                      name="maintenance_duration"
                      onChange={inputChange}
                      value={data.maintenance_duration}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Mechanical notes:</label>

                    <textarea
                      type="text"
                      rows="2"
                      cols="25"
                      placeholder="E.g. Axles are..."
                      name="mechanical_notes"
                      onChange={inputChange}
                      value={data.mechanical_notes}
                    />
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
