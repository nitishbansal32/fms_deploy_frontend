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
    setModalColor,
    inventoryData,
  } = useContext(UserContext);

  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const [file, setFile] = useState({
    maintenance_documents: "none",
  });

  const [data, setData] = useState({
    type: "",
  });

  // console.log(data.emloyee_name);

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
  formData.append("employee_name", `${!data.type ? "general" : data.type}`);
  formData.append("start_date", data.maintenance_documents);

  const InventoryNumber = inventoryData.unit;

  //Duplicate value entered for employee_id field, please choose another value

  const handleSubmit = (e) => {
    e.preventDefault();

    setModal(true);
    setMsg("Adding new maintainance.... Please wait");
    setModalColor("green");

    Axios.patch(
      `https://lc-backend-v2.herokuapp.com/api/v1/LC/tractors/maintenance/${inventoryData.unit}`,
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
        setMsg("Maintenance Added!");
        setModal(true);
        setModalColor("green");
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        if (err.response.data.msg == "File size must be less than 1MB") {
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
    navigate("/inventory", { replace: true });
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
                <h1>Add new maintainence</h1>

                <div className={styles.table_container}>
                  <div className={styles.table_content}>
                    <label htmlFor="">Type:</label>
                    <select
                      name="type"
                      id=""
                      onChange={inputChange}
                      value={data.shift}
                      // default={}
                      required
                    >
                      <option selected="selected" value="general">
                        General
                      </option>
                      <option value="PM">PM</option>
                    </select>
                  </div>

                  <div className={styles.table_file_container}>
                    <div>
                      <label>Maintainence documents</label>
                      <input
                        type="file"
                        name="maintenance_documents"
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
