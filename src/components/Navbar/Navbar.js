import styles from "./Navbar.module.css";
import { UserContext } from "../../UserContext";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import Logo from "../../../src/Images/Logo(signIn).jpeg";
import dashboard from "../../../src/Images/dashboard.svg";
import equipment from "../../../src/Images/equipment.svg";
import driver from "../../../src/Images/driver.svg";
import accident from "../../../src/Images/accident.svg";
import register from "../../../src/Images/register.svg";
import logout from "../../../src/Images/logout.svg";

const Navbar = () => {
  const { setIsLoggedIn } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogOut = () => {
    setIsLoggedIn(null);
    navigate("/", { replace: true });
    localStorage.removeItem("token");
    console.log(localStorage.getItem("token"));
  };

  return (
    <div className={styles.container}>
      <img src={Logo} />
      <ul>
        <Link to="/dashboard">
          <div className={styles.nav_container}>
            <div className={styles.nav_child}>
              <img src={dashboard} alt="" />
              <button>Dashboard</button>{" "}
            </div>
          </div>
        </Link>
        <Link to="/inventory">
          <div className={styles.nav_container}>
            <div className={styles.nav_child}>
              <img src={equipment} alt="" />
              <button>Equipment</button>{" "}
            </div>
          </div>
        </Link>
        <Link to="/drivers">
          <div className={styles.nav_container}>
            <div className={styles.nav_child}>
              <img src={driver} alt="" />
              <button>Drivers</button>
            </div>
          </div>
        </Link>
        <Link to="/accident">
          <div className={styles.nav_container}>
            <div className={styles.nav_child}>
              <img src={accident} alt="" />
              <button>Accident</button>
            </div>
          </div>
        </Link>
        <Link to="/register">
          <div className={styles.nav_container}>
            <div className={styles.nav_child}>
              <img src={register} alt="" />
              <button>Register</button>
            </div>
          </div>
        </Link>
      </ul>
      {/* <div className={styles.lower_container}>
                <Link to="/">
                    {" "}
                    <button>Profile</button>{" "}
                </Link>
                <Link to="/">
                    <button>Settings</button>
                </Link>
            </div> */}

      <button onClick={handleLogOut} className={styles.logOut_button}>
        LogOut
      </button>
    </div>
  );
};

export default Navbar;
