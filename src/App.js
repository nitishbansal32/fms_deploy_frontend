import "./App.css";

import Inventory from "./components/Inventory/Inventory";
import Accident from "./components/Accident/Accident";
import Drivers from "./components/Drivers/Drivers";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Employee from "./components/Employee/Employee";
import Modal from "./components/Modal/Modal";
import ServiceDash from "./components/ServiceDash/ServiceDash";
import DriverForm from "./components/Drivers/DriverForm";
import InventoryForm from "./components/Inventory/InventoryForm";

import { UserContext } from "./UserContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useMemo } from "react";

function App() {
  //Context API states
  const [user, setUser] = useState(""); // For getting user details
  const [isLoggedIn, setIsLoggedIn] = useState(null); //For knowing whether user is loggedin
  const [role, setRole] = useState(""); //For passing the role of the user
  const [msg, setMsg] = useState(""); //For setting the modal message
  const [display, setDisplay] = useState(false);

  const value = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      role,
      setRole,

      msg,
      setMsg,
      display,
      setDisplay,
    }),
    [isLoggedIn, setIsLoggedIn, role, setRole, msg, setMsg, display, setDisplay]
  );

  return (
    <UserContext.Provider value={value}>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />}></Route>

            <Route exact path="/dashboard" element={<Dashboard />}></Route>

            <Route exact path="/inventory" element={<Inventory />}></Route>
            <Route exact path="/drivers" element={<Drivers />}></Route>
            <Route exact path="/accident" element={<Accident />}></Route>

            <Route exact path="/register" element={<Employee />}></Route>
            <Route
              exact
              path="/registerDriver"
              element={<DriverForm />}
            ></Route>
            <Route
              exact
              path="/registerInventory"
              element={<InventoryForm />}
            ></Route>
            <Route exact path="/allservices" element={<ServiceDash />}></Route>
          </Routes>
        </Router>
        {/* {modal && <Modal />} */}
      </div>
    </UserContext.Provider>
  );
}

export default App;
