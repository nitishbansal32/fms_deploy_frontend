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
    setDisplay,
  } = useContext(UserContext);

  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const [file, setFile] = useState({
    invoice: "none",
    safety_certificate: "none",
    inspection_checklist: "none",
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
  formData.append("type", `${!data.type ? "general" : data.type}`);
  formData.append("invoice", data.invoice);
  formData.append("safety_certificate", data.safety_certificate);
  formData.append("inspection_checklist", data.inspection_checklist);

  const InventoryNumber = inventoryData.unit;

  //Duplicate value entered for employee_id field, please choose another value

  const handleSubmit = (e) => {
    e.preventDefault();

    setModal(true);
    setMsg("Adding new maintainance.... Please wait");
    setModalColor("green");

    Axios.patch(
      `https://loadlc-backend-staging.herokuapp.com/api/v1/LC/tractors/maintenance/${inventoryData.unit}`,
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
    setDisplay(true);
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
                      value={data.type}
                      required
                    >
                      <option selected="selected" value="general">
                        General
                      </option>
                      <option value="PM">PM</option>
                      <option value="safety">Safety</option>
                    </select>
                  </div>
                  <div className={styles.table_file_container}>
                    <div>
                      <label>Invoice</label>
                      <input
                        type="file"
                        name="invoice"
                        onChange={fileInputChange}
                        // value={file.training}
                      />
                    </div>
                    <div>
                      <label>Safety certificate</label>
                      <input
                        type="file"
                        name="safety_certificate"
                        onChange={fileInputChange}
                        // value={file.training}
                      />
                    </div>
                    <div>
                      <label>Inspection checklist</label>
                      <input
                        type="file"
                        name="inspection_checklist"
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
