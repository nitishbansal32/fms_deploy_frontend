// Permission Handling route
import { UserContext } from "../../UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Permission = () => {
    return (
        <div className="not_logged_in">
            <h1>Click below to SignIn</h1>
            <Link to="/">
                <button>Sign In</button>
            </Link>
        </div>
    );
};

export default Permission;
