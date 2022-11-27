import styles from "./Navbar.module.css";
import { UserContext } from "../../UserContext";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";

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
            <img src alt="" />
            <ul>
                <Link to="/dashboard">
                    {" "}
                    <button>Dashboard</button>{" "}
                </Link>
                <Link to="/inventory">
                    {" "}
                    <button>Inventory</button>{" "}
                </Link>
                <Link to="/drivers">
                    <button>Drivers</button>
                </Link>
                <Link to="/accident">
                    <button>Accident</button>
                </Link>
                <Link to="/register">
                    <button>Register</button>
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

            <button
                onClick={handleLogOut}
                style={{ color: "red", fontWeight: 550 }}
            >
                LogOut
            </button>
        </div>
    );
};

export default Navbar;
