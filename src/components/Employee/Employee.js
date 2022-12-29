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
  const { isLoggedIn, setIsLoggedIn, role, modal, setModal, msg, setMsg } =
    useContext(UserContext);

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
    shift: data.shift,
    contact: data.contact,
    emergency_contact: data.emergency_contact,
    DOB: `${data.DOB}`,
    start_date: `${data.start_date}`,
    employee_type: data.employee_type,
    phone_number: data.phone_number,
    address: data.address,
    city: data.city,
    province: data.province,
    postal_code: data.postal_code,
    country: data.country,
    is_active: true,
  };

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`https://lc-backend-v2.herokuapp.com/api/v1/LC/register`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        setStatus(response.status);
        setMsg("Employee Added!");
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
      <div className="wrapper_container">
        <Navbar />
        {!(role === "employee") ? (
          <div className={styles.main_container}>
            <form onSubmit={handleSubmit} action="">
              <div className={styles.table_wrapper_container}>
                <h1>Register employee</h1>

                <div className={styles.table_container}>
                  <div className={styles.table_content}>
                    <label htmlFor="">Name:</label>
                    <input
                      type="text"
                      placeholder="Enter Name"
                      name="name"
                      onChange={inputChange}
                      value={data.name}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">First name:</label>
                    <input
                      type="text"
                      placeholder="Enter First Name"
                      name="first_name"
                      onChange={inputChange}
                      value={data.first_name}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Last name:</label>
                    <input
                      type="text"
                      placeholder="Enter Last Name"
                      name="last_name"
                      onChange={inputChange}
                      value={data.last_name}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Email:</label>
                    <input
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      onChange={inputChange}
                      value={data.email}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Password:</label>
                    <input
                      type="text"
                      placeholder="Enter Password"
                      name="password"
                      onChange={inputChange}
                      value={data.password}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Employee ID:</label>

                    <input
                      type="text"
                      placeholder="Enter Employee ID"
                      name="employee_id"
                      onChange={inputChange}
                      value={data.employee_id}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Location:</label>

                    <input
                      type="text"
                      placeholder="Enter Location"
                      name="location"
                      onChange={inputChange}
                      value={data.location}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Title:</label>

                    <input
                      type="text"
                      placeholder="Enter Title"
                      name="title"
                      onChange={inputChange}
                      value={data.title}
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
                    <label htmlFor="shift">Select Shift</label>
                    <select
                      name="shift"
                      id=""
                      onChange={inputChange}
                      value={data.shift}
                      //   default="Select Shift"
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Contact:</label>

                    <input
                      type="text"
                      placeholder="Enter contact"
                      name="contact"
                      onChange={inputChange}
                      value={data.contact}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Emergency contact:</label>

                    <input
                      type="text"
                      placeholder="Enter emergency contact"
                      name="emergency_contact"
                      onChange={inputChange}
                      value={data.emergency_contact}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">DOB:</label>

                    <input
                      type="text"
                      placeholder="Enter DOB"
                      name="DOB"
                      onChange={inputChange}
                      value={data.DOB}
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
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Select employee type</label>
                    <select
                      name="employee_type"
                      id=""
                      onChange={inputChange}
                      value={data.employee_type}
                      //   default="Select Shift"
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
                      placeholder="Enter Phone number"
                      name="phone_number"
                      onChange={inputChange}
                      value={data.phone_number}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Address:</label>

                    <input
                      type="text"
                      placeholder="Enter address"
                      name="address"
                      onChange={inputChange}
                      value={data.address}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">City:</label>

                    <input
                      type="text"
                      placeholder="Enter city"
                      name="city"
                      onChange={inputChange}
                      value={data.city}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Province:</label>

                    <input
                      type="text"
                      placeholder="Enter province"
                      name="province"
                      onChange={inputChange}
                      value={data.province}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Posatal code:</label>

                    <input
                      type="text"
                      placeholder="Enter postal code"
                      name="postal_code"
                      onChange={inputChange}
                      value={data.postal_code}
                    />
                  </div>
                  <div className={styles.table_content}>
                    <label htmlFor="">Country:</label>
                    <input
                      type="text"
                      placeholder="Enter country"
                      name="country"
                      onChange={inputChange}
                      value={data.country}
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
                      <option value="admin">admin</option>
                      <option value="employee">employee</option>
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
