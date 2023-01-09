import styles from "./Employee.module.css";
import Axios from "axios";
import { useState, useContext } from "react";
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
    setModalColor,
  } = useContext(UserContext);

  const [validator, setValidator] = useState({
    email: false,
    password: false,
    phone: false,
    date: false,
    dateDOB: false,
  });

  const [status, setStatus] = useState("");

  const [data, setData] = useState({
    name: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    employee_id: "",
    location: "",
    title: "",
    supervisor: "",
    shift: "",
    contact: "",
    emergency_contact: "",
    DOB: "",
    start_date: "",
    employee_type: "",
    phone_number: "",
    address: "",
    city: "",
    province: "",
    postal_code: "",
    country: "",
    role: "",
    is_active: "",
  });

  const inputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name);
  };

  const body = {
    name: data.name,
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    password: data.password,
    employee_id: data.employee_id,
    location: data.location,
    title: data.title,
    supervisor: data.supervisor,
    shift: `${!data.shift ? "AM" : data.shift}`,
    contact: data.contact,
    emergency_contact: data.emergency_contact,
    DOB: `${data.DOB}`,
    start_date: `${data.start_date}`,
    employee_type: `${!data.employee_type ? "Full Time" : data.employee_type}`,
    phone_number: data.phone_number,
    address: data.address,
    city: data.city,
    province: data.province,
    postal_code: data.postal_code,
    country: data.country,
    role: `${!data.role ? "employee" : data.role}`,
    is_active: true,
  };

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  console.log(validator.email);

  const ValidatorFunc = () => {
    //Email Validator
    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(data.email)) {
      setValidator((prev) => ({
        ...prev,
        [`email`]: true,
      }));
    } else {
      setValidator((prev) => ({
        ...prev,
        [`email`]: false,
      }));
    }

    //Password Validator
    if (data.password.length < 8) {
      setValidator((prev) => ({
        ...prev,
        [`password`]: true,
      }));
    } else {
      setValidator((prev) => ({
        ...prev,
        [`password`]: false,
      }));
    }

    //Phone Validator
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

    //StartDate Validator
    if (
      !/\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/.test(
        data.start_date
      )
    ) {
      setValidator((prev) => ({
        ...prev,
        [`date`]: true,
      }));
    } else {
      setValidator((prev) => ({
        ...prev,
        [`date`]: false,
      }));
    }

    //DOB Validator
    if (
      !/\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/.test(
        data.start_date
      )
    ) {
      setValidator((prev) => ({
        ...prev,
        [`dateDOB`]: true,
      }));
    } else {
      setValidator((prev) => ({
        ...prev,
        [`dateDOB`]: false,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setModal(true);
    setMsg("Adding new user.... Please wait");
    setModalColor("green");

    Axios.post(`https://lc-backend-v2.herokuapp.com/api/v1/LC/register`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        setStatus(response.status);
        setMsg("Employee Added!");
        setModal(true);
        setModalColor("green");
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.data.msg == "Email already exists") {
          setMsg("Email ID already exists!");
          setModal(true);
          setModalColor("red");
        } else if (err.response.data.msg == "Please provide valid email") {
          setMsg("Please provide valid email!");
          setModal(true);
          setModalColor("red");
        } else if (
          err.response.data.msg === "Unauthorized to access this route"
        ) {
          setMsg("You are Unauthorized!");
          setModal(true);
          setModalColor("red");
        } else {
          setMsg("Try again");
          setModal(true);
          setModalColor("red");
        }
      });
  };
  const handleUpdateUser = () => {
    setModal(false);
  };

  return (
    <>
      <div className="wrapper_container">
        <Navbar />
        {!(role === "employee") ? (
          <div className={styles.main_container}>
            <form onSubmit={handleSubmit} action="">
              <div className={styles.table_wrapper_container}>
                <h1>Add new user</h1>

                <div className={styles.table_container}>
                  <div className={styles.table_content}>
                    <label htmlFor="">Name:</label>
                    <input
                      type="text"
                      placeholder="E.g. David Williams"
                      name="name"
                      onChange={inputChange}
                      value={data.name}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">First name:</label>
                    <input
                      type="text"
                      placeholder="E.g. David"
                      name="first_name"
                      minlength="3"
                      maxlength="50"
                      onChange={inputChange}
                      value={data.first_name}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Last name:</label>
                    <input
                      type="text"
                      placeholder="E.g. Williams"
                      name="last_name"
                      minlength="3"
                      maxlength="50"
                      onChange={inputChange}
                      value={data.last_name}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Email ID:</label>
                    <input
                      type="email"
                      placeholder="E.g. abcd@email.com"
                      name="email"
                      onChange={inputChange}
                      value={data.email}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Password:</label>
                    <input
                      type="text"
                      placeholder="Something discrete"
                      name="password"
                      minlength="6"
                      onChange={inputChange}
                      value={data.password}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Employee ID:</label>

                    <input
                      type="text"
                      placeholder="E.g. ABCD1234"
                      name="employee_id"
                      onChange={inputChange}
                      value={data.employee_id}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Location:</label>

                    <input
                      type="text"
                      placeholder="E.g. Ontario"
                      name="location"
                      onChange={inputChange}
                      value={data.location}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Title:</label>

                    <input
                      type="text"
                      placeholder="E.g. Driver"
                      name="title"
                      onChange={inputChange}
                      value={data.title}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Supervisor:</label>

                    <input
                      type="text"
                      placeholder="E.g. Ronda"
                      name="supervisor"
                      onChange={inputChange}
                      value={data.supervisor}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="shift">Select Shift</label>
                    <select
                      name="shift"
                      id=""
                      onChange={inputChange}
                      value={data.shift}
                      required
                      //   default="Select Shift"
                    >
                      <option selected="selected" value="AM">
                        AM
                      </option>
                      <option value="PM">PM</option>
                    </select>
                  </div>

                  <div className={styles.table_content}>
                    <label htmlFor="">DOB:</label>

                    <input
                      type="date"
                      data-date-format="YYYY MM DD"
                      placeholder="Enter DOB"
                      name="DOB"
                      onChange={inputChange}
                      value={data.DOB}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Start date:</label>

                    <input
                      type="date"
                      data-date-format="YYYY MM DD"
                      placeholder="Enter start date"
                      name="start_date"
                      onChange={inputChange}
                      value={data.start_date}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Contact:</label>

                    <input
                      type="text"
                      placeholder="Email or contact number"
                      name="contact"
                      onChange={inputChange}
                      value={data.contact}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Emergency contact:</label>

                    <input
                      type="text"
                      placeholder="Email or contact number"
                      name="emergency_contact"
                      onChange={inputChange}
                      value={data.emergency_contact}
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Select employee type</label>
                    <select
                      name="employee_type"
                      id=""
                      onChange={inputChange}
                      value={data.employee_type}
                      required
                    >
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Seasonal">Seasonal</option>
                      <option value="Intern">Intern</option>
                      <option value="Temporary">Temporary</option>
                    </select>
                    {/* <input
                      type="text"
                      placeholder="Enter employee type"
                      name="employee_type"
                      onChange={inputChange}
                      value={data.employee_type}
                    /> */}
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Phone number:</label>

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
                    <label htmlFor="">Address:</label>

                    <textarea
                      rows="2"
                      cols="25"
                      type="text"
                      placeholder="Must be above 50 letters"
                      name="address"
                      onChange={inputChange}
                      value={data.address}
                      minlength="10"
                      required
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">City:</label>

                    <input
                      type="text"
                      placeholder="E.g. Richmond"
                      name="city"
                      onChange={inputChange}
                      value={data.city}
                      required
                      minlength="3"
                      maxlength="50"
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Province:</label>

                    <input
                      type="text"
                      placeholder="E.g. Alberta"
                      name="province"
                      onChange={inputChange}
                      value={data.province}
                      required
                      minlength="2"
                      maxlength="50"
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Postal code:</label>

                    <input
                      type="text"
                      placeholder="E.g. K0A0A2"
                      name="postal_code"
                      onChange={inputChange}
                      value={data.postal_code}
                      required
                      minlength="2"
                      maxlength="10"
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Country:</label>
                    <input
                      type="text"
                      placeholder="E.g. Canada"
                      name="country"
                      onChange={inputChange}
                      value={data.country}
                      required
                      minlength="3"
                      maxlength="10"
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="shift">Select employee position</label>
                    <select
                      name="role"
                      id=""
                      onChange={inputChange}
                      value={data.role}
                    >
                      <option selected="selected" value="employee">
                        employee
                      </option>
                      <option value="admin">admin</option>
                      <option value="insurance-company">
                        insurance-company
                      </option>
                      <option value="super-admin">super-admin</option>
                      <option value="sub-super-admin">sub-super-admin</option>
                    </select>
                    {/* <input
                      type="text"
                      placeholder="Enter role"
                      name="role"
                      onChange={inputChange}
                      value={data.role}
                    /> */}
                  </div>

                  <br />
                </div>
                <div className={styles.button_container}>
                  <button>Submit</button>
                  <Link to="">
                    <button onClick={handleUpdateUser}>Update user</button>
                  </Link>
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
