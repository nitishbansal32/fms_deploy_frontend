import "./App.css";

import Inventory from "./components/Inventory/Inventory";
import Accident from "./components/Accident/Accident";
import Drivers from "./components/Drivers/Drivers";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Employee from "./components/Employee/Employee";
import { UserContext } from "./UserContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useMemo } from "react";

function App() {
    const [user, setUser] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [role, setRole] = useState("");

    const value = useMemo(
        () => ({ isLoggedIn, setIsLoggedIn, role, setRole }),
        [isLoggedIn, setIsLoggedIn, role, setRole]
    );

    return (
        <div className="App">
            <Router>
                <UserContext.Provider value={value}>
                    <Routes>
                        <Route exact path="/" element={<Login />}></Route>

                        <Route
                            exact
                            path="/dashboard"
                            element={<Dashboard />}
                        ></Route>

                        <Route
                            exact
                            path="/inventory"
                            element={<Inventory />}
                        ></Route>
                        <Route
                            exact
                            path="/drivers"
                            element={<Drivers />}
                        ></Route>
                        <Route
                            exact
                            path="/accident"
                            element={<Accident />}
                        ></Route>

                        <Route
                            exact
                            path="/register"
                            element={<Employee />}
                        ></Route>
                    </Routes>
                </UserContext.Provider>
            </Router>
        </div>
    );
}

export default App;
