import styles from "./ServiceDash.module.css";
import Navbar from "../../components/Navbar/Navbar";

import FMS from "../../../src/Images/Logo(signIn).jpeg";
import LabourCentral from "../../../src/Images/LabourCentral.jpeg";
import LabourConnect from "../../../src/Images/LabourConnect.jpeg";
import LoadCentral from "../../../src/Images/LoadCentral.jpeg";
import ERS from "../../../src/Images/ERS.svg";
import IT from "../../../src/Images/IT.svg";

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
      <div className={styles.master_container}>
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
                <Link to="/loading">
                  <div className={styles.service_desc}>
                    <img src={FMS} alt="" style={{ height: "80px" }} />
                    <p>
                      Our fleet management system, capitalizes on over 25 years
                      of experience, and brings you the ability to achieve and
                      sustain CVOR compliance. Labour Connect: Is the Staffing
                      Services wing of LC. It is a search, recruiting and
                      staffing firm that matches companies and job candidates.
                      By registering with Labour Connect, you have the power to
                      find top-notch candidates to fill job openings. LC will
                      save you time finding individuals that you may not be able
                      to find on your own.
                    </p>
                  </div>
                </Link>
              </div>
              <div className={styles.service}>
                <div className={styles.service_desc}>
                  <img src={LabourCentral} alt="" style={{ height: "80px" }} />
                  <p>
                    LC’s Labor Management System facilitates the tracking of
                    worker’s activities. It is a system that allows employees to
                    log activities throughout the day on a local PC and provides
                    feedback on their daily productivity. Management can use
                    this tool to assess current or future headcount needs as
                    well as manage poor performance on a timely manner.
                  </p>
                </div>
              </div>
              <div className={styles.service}>
                <div className={styles.service_desc}>
                  <img src={LabourConnect} alt="" style={{ height: "80px" }} />
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                    molestiae cumque velit? Dolore veritatis quam laborum odio
                    impedit doloremque a aspernatur, rerum similique
                    consequuntur magnam mollitia minima! Aliquam, consequuntur
                    voluptas.
                  </p>
                </div>
              </div>

              <div className={styles.service}>
                <div className={styles.service_desc}>
                  <img src={LoadCentral} alt="" style={{ height: "80px" }} />
                  <p>
                    Is a dispatch system designed to help automate routing and
                    the scheduling processes, provide a simpler and more
                    efficient way to coordinate routes and deliveries while
                    mitigating costly errors.
                  </p>
                </div>
              </div>
              <div className={styles.service}>
                <div className={styles.service_desc}>
                  <img src={ERS} alt="" style={{ height: "80px" }} />
                  <p>
                    Enterprise reporting is the creation and distribution of
                    reports concerning business performance to key decision
                    makers in an organization. Our set of tools include reports
                    on metrics for key performance indicators on all aspects of
                    the business, human capital, quality, financials, etc. The
                    reporting tools deliver day-to-day activity reports as well
                    as weekly, monthly and YoY. ERS is a powerful tool,
                    beneficial to supervisors, mid-managers as well as senior
                    executives that need to be appraised of business
                    performance.
                  </p>
                </div>
              </div>
              <div className={styles.service}>
                <div className={styles.service_desc}>
                  <img src={IT} alt="" style={{ height: "80px" }} />
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                    molestiae cumque velit? Dolore veritatis quam laborum odio
                    impedit doloremque a aspernatur, rerum similique
                    consequuntur magnam mollitia minima! Aliquam, consequuntur
                    voluptas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDash;
