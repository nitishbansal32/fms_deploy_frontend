import styles from "./Navbar.module.css";
import { UserContext } from "../../UserContext";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import Logo from "../../../src/Images/Logo(signIn).png";
import hamClose from "../../../src/Images/hamClose.svg";
import HamMenu from "../../../src/Images/hamMenu.svg";
import dashboard from "../../../src/Images/dashboard.svg";
import equipment from "../../../src/Images/equipment.svg";
import driver from "../../../src/Images/driver.svg";
import accident from "../../../src/Images/accident.svg";
import register from "../../../src/Images/register.svg";
import settings from "../../../src/Images/settings.svg";
import logout from "../../../src/Images/logout.svg";

const Navbar = () => {
  const { setIsLoggedIn } = useContext(UserContext);

  const navigate = useNavigate();

  const { display, setDisplay, setModal } = useContext(UserContext);

  const [displayMobile, setDisplayMobile] = useState(false);

  const handleDisplay = () => {
    setDisplay(false);
    setModal(false);
  };

  const handleLogOut = () => {
    setIsLoggedIn(null);
    setModal(false);
    navigate("/", { replace: true });
    localStorage.removeItem("token");
    console.log(localStorage.getItem("token"));
  };

  const MenuContainerDisplay = () => {
    setDisplayMobile((prev) => !prev);
  };

  return (
    <div>
      <div className={styles.mobile_nav_container}>
        <div className={styles.menu_container}>
          {displayMobile ? (
            <img onClick={MenuContainerDisplay} src={hamClose} alt="" />
          ) : (
            <img onClick={MenuContainerDisplay} src={HamMenu} alt="" />
          )}
          <img
            src={localStorage.getItem("logo")}
            alt=""
            className={styles.company_logo}
          />
        </div>
        {displayMobile && (
          <div className={styles.menu_open_container}>
            <Link to="/dashboard" onClick={handleDisplay}>
              <div className={styles.nav_container}>
                <div className={styles.nav_child}>
                  <button>Dashboard</button>{" "}
                </div>
              </div>
            </Link>
            <Link to="/inventory" onClick={handleDisplay}>
              <div className={styles.nav_container}>
                <div className={styles.nav_child}>
                  <button>Equipment</button>{" "}
                </div>
              </div>
            </Link>
            <Link to="/drivers" onClick={handleDisplay}>
              <div className={styles.nav_container}>
                <div className={styles.nav_child}>
                  <button>Drivers</button>
                </div>
              </div>
            </Link>
            <Link to="/accident" onClick={handleDisplay}>
              <div className={styles.nav_container}>
                <div className={styles.nav_child}>
                  <button>Accident</button>
                </div>
              </div>
            </Link>
            <Link to="/register" onClick={handleDisplay}>
              <div className={styles.nav_container}>
                <div className={styles.nav_child}>
                  <button>Register</button>
                </div>
              </div>
            </Link>
            <Link to="/settings" onClick={handleDisplay}>
              <div className={styles.nav_container}>
                <div className={styles.nav_child}>
                  <button>Settings</button>
                </div>
              </div>
            </Link>
            <button onClick={handleLogOut} className={styles.logOut_button}>
              LogOut
            </button>
          </div>
        )}
      </div>
      <div className={styles.container}>
        <div className={styles.nav_logo_container}>
          <img src={Logo} />
          <hr style={{ opacity: "0.1" }} />
          <img src={localStorage.getItem("logo")} alt="" />
        </div>

        <ul>
          <Link to="/dashboard" onClick={handleDisplay}>
            <div className={styles.nav_container}>
              <div className={styles.nav_child}>
                <img
                  src={dashboard}
                  alt=""
                  style={{ height: "24px", width: "22px" }}
                />
                <button>Dashboard</button>{" "}
              </div>
            </div>
          </Link>
          <Link to="/inventory" onClick={handleDisplay}>
            <div className={styles.nav_container}>
              <div className={styles.nav_child}>
                <img
                  src={equipment}
                  alt=""
                  style={{ height: "24px", width: "22px" }}
                />
                <button>Equipment</button>{" "}
              </div>
            </div>
          </Link>
          <Link to="/drivers" onClick={handleDisplay}>
            <div className={styles.nav_container}>
              <div className={styles.nav_child}>
                <img
                  src={driver}
                  alt=""
                  style={{ height: "24px", width: "22px" }}
                />
                <button>Drivers</button>
              </div>
            </div>
          </Link>
          <Link to="/accident" onClick={handleDisplay}>
            <div className={styles.nav_container}>
              <div className={styles.nav_child}>
                <img
                  src={accident}
                  alt=""
                  style={{ height: "24px", width: "22px" }}
                />
                <button>Accident</button>
              </div>
            </div>
          </Link>
          <Link to="/register" onClick={handleDisplay}>
            <div className={styles.nav_container}>
              <div className={styles.nav_child}>
                <img
                  src={register}
                  alt=""
                  style={{ height: "24px", width: "22px" }}
                />
                <button>Register</button>
              </div>
            </div>
          </Link>
          <Link to="/settings" onClick={handleDisplay}>
            <div className={styles.nav_container}>
              <div className={styles.nav_child}>
                <img
                  src={settings}
                  alt=""
                  style={{ height: "24px", width: "22px" }}
                />
                <button>Settings</button>
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
    </div>
  );
};

export default Navbar;
