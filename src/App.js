import "./App.css";

import Inventory from "./components/Inventory/Inventory";
import Accident from "./components/Accident/Accident";
import Drivers from "./components/Drivers/Drivers";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Employee from "./components/Employee/Employee";
import Settings from "./components/Settings/Settings";
import Modal from "./components/Modal/Modal";
import ServiceDash from "./components/ServiceDash/ServiceDash";

import DashDriverForm from "./components/Dashboard/DriverForm";
import DashAccidentForm from "./components/Dashboard/AccidentForm";
import DashInventoryForm from "./components/Dashboard/InventoryForm";

import DriverForm from "./components/Drivers/DriverForm";
import AccidentForm from "./components/Accident/AccidentForm";
import InventoryForm from "./components/Inventory/InventoryForm";

import Loading from "./components/Loading";

import UpdateInventory from "./components/Inventory/UpdateInventory";
import UpdateAccident from "./components/Accident/UpdateAccident";
import UpdateDriver from "./components/Drivers/UpdateDriver";
// import UpdateEmployee from "./components/Employee/UpdateEmployee";
// import UpdateDriver from "./components/Drivers/UpdateDriver";

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
  const [modal, setModal] = useState(false);
  const [modalColor, setModalColor] = useState("");

  const [inventoryData, setInventoryData] = useState([]);
  const [driverData, setDriverData] = useState([]);
  const [accidentData, setAccidentData] = useState([]);

  const value = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      role,
      setRole,
      modal,
      setModal,
      msg,
      setMsg,
      display,
      setDisplay,
      inventoryData,
      setInventoryData,
      driverData,
      setDriverData,
      accidentData,
      setAccidentData,
      modalColor,
      setModalColor,
    }),
    [
      isLoggedIn,
      setIsLoggedIn,
      role,
      setRole,
      modal,
      setModal,
      msg,
      setMsg,
      display,
      setDisplay,
      inventoryData,
      setInventoryData,
      driverData,
      setDriverData,
      accidentData,
      setAccidentData,
      modalColor,
      setModalColor,
    ]
  );

  return (
    <UserContext.Provider value={value}>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />}></Route>

            <Route exact path="/dashboard" element={<Dashboard />}></Route>
            <Route
              exact
              path="/registerDashAccident"
              element={<DashAccidentForm />}
            ></Route>
            <Route
              exact
              path="/registerDashInventory"
              element={<DashInventoryForm />}
            ></Route>
            <Route
              exact
              path="/registerDashDriver"
              element={<DashDriverForm />}
            ></Route>

            <Route exact path="/inventory" element={<Inventory />}></Route>
            <Route exact path="/drivers" element={<Drivers />}></Route>
            <Route exact path="/accident" element={<Accident />}></Route>
            <Route exact path="/register" element={<Employee />}></Route>
            <Route exact path="/settings" element={<Settings />}></Route>
            <Route
              exact
              path="/registerDriver"
              element={<DriverForm />}
            ></Route>
            <Route
              exact
              path="/updateDriver"
              element={<UpdateDriver />}
            ></Route>
            <Route
              exact
              path="/registerInventory"
              element={<InventoryForm />}
            ></Route>
            <Route
              exact
              path="/updateInventory"
              element={<UpdateInventory />}
            ></Route>
            <Route
              exact
              path="/registerAccident"
              element={<AccidentForm />}
            ></Route>
            <Route
              exact
              path="/updateAccident"
              element={<UpdateAccident />}
            ></Route>
            {/* <Route
              exact
              path="/updateUser"
              element={<UpdateEmployee />}
            ></Route> */}

            <Route exact path="/allservices" element={<ServiceDash />}></Route>

            <Route exact path="/loading" element={<Loading />}></Route>
          </Routes>
        </Router>
        {modal && <Modal />}
      </div>
    </UserContext.Provider>
  );
}

export default App;
