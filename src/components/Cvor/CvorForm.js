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
  } = useContext(UserContext);

  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const [file, setFile] = useState({
    CVIR: "",
    CVOR: "",
    citations: "",
  });

  const fileInputChange = (e) => {
    setFile({
      ...file,
      [e.target.name]: e.target.files[0],
    });
  };

  const formData = new FormData();

  //Files
  formData.append("CVOR", file.CVOR);
  formData.append("CVIR", file.CVIR);

  formData.append("citations", file.citations);

  const handleSubmit = (e) => {
    e.preventDefault();

    setModal(true);
    setMsg("Adding new files.... Please wait");
    setModalColor("green");

    Axios.post(
      `https://loadlc-backend-staging.herokuapp.com/api/v1/LC/addCVOR`,
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
        setMsg("Files added!");
        setModal(true);
        setModalColor("green");
      })
      .catch((err) => {
        console.log(err);
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
    navigate("/cvor", { replace: true });
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
                <h1>Add new files</h1>
                <div className={styles.table_container}>
                  <div className={styles.table_file_container}>
                    <div>
                      <label>CVIR</label>
                      <input
                        type="file"
                        name="CVIR"
                        onChange={fileInputChange}
                      />
                    </div>
                    <div>
                      <label>CVOR</label>
                      <input
                        type="file"
                        name="CVOR"
                        onChange={fileInputChange}
                        // value={file.license_disclosure}
                      />
                    </div>
                    <div>
                      <label>Citations</label>
                      <input
                        type="file"
                        name="citations"
                        onChange={fileInputChange}
                        // value={file.license_disclosure}
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
    </>
  );
};

export default Inventory;
