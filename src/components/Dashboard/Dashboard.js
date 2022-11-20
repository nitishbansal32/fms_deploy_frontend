import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
    return (
        <div>
            <ul>
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
            </ul>
        </div>
    );
};

export default Dashboard;
