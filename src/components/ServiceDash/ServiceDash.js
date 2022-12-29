import styles from "./ServiceDash.module.css";
import Navbar from "../../components/Navbar/Navbar";

import FMS from "../../../src/Images/Logo(signIn).jpeg";
import LabourCentral from "../../../src/Images/LabourCentral.jpeg";
import LabourConnect from "../../../src/Images/LabourConnect.jpeg";
import LoadCentral from "../../../src/Images/LoadCentral.jpeg";

import { UserContext } from "../../UserContext";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import Logo from "../../../src/Images/Logo.jpeg";

const ServiceDash = () => {
  const { setIsLoggedIn } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogOut = () => {
    setIsLoggedIn(null);
    navigate("/", { replace: true });
    localStorage.removeItem("token");
    console.log(localStorage.getItem("token"));
  };
  return (
    <div class="wrapper_container">
      <div className={styles.container}>
        <img src={Logo} />
        <button onClick={handleLogOut} className={styles.logOut_button}>
          LogOut
        </button>
      </div>
      <div className={styles.main_container}>
        <div className={styles.main_service_container}>
          <h1>All Services</h1>
          <div className={styles.all_services}>
            <div className={styles.service}>
              <Link to="/dashboard">
                <div className={styles.service_desc}>
                  <img src={FMS} alt="" style={{ width: "150px" }} />
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                    molestiae cumque velit? Dolore veritatis quam laborum odio
                    impedit doloremque a aspernatur, rerum similique
                    consequuntur magnam mollitia minima! Aliquam, consequuntur
                    voluptas.
                  </p>
                </div>
              </Link>
            </div>
            <div className={styles.service}>
              <div className={styles.service_desc}>
                <img src={LabourCentral} alt="" style={{ width: "170px" }} />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                  molestiae cumque velit? Dolore veritatis quam laborum odio
                  impedit doloremque a aspernatur, rerum similique consequuntur
                  magnam mollitia minima! Aliquam, consequuntur voluptas.
                </p>
              </div>
            </div>
            <div className={styles.service}>
              <div className={styles.service_desc}>
                <img src={LabourConnect} alt="" style={{ width: "170px" }} />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                  molestiae cumque velit? Dolore veritatis quam laborum odio
                  impedit doloremque a aspernatur, rerum similique consequuntur
                  magnam mollitia minima! Aliquam, consequuntur voluptas.
                </p>
              </div>
            </div>

            <div className={styles.service}>
              <div className={styles.service_desc}>
                <img src={LoadCentral} alt="" style={{ width: "170px" }} />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                  molestiae cumque velit? Dolore veritatis quam laborum odio
                  impedit doloremque a aspernatur, rerum similique consequuntur
                  magnam mollitia minima! Aliquam, consequuntur voluptas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDash;
