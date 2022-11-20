import "./App.css";

import Inventory from "./components/Inventory/Inventory";
import Accident from "./components/Accident/Accident";
import Drivers from "./components/Drivers/Drivers";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {



    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path="/login" element={<Login />}></Route>
                    <Route exact path="/" element={<Dashboard />}></Route>
                    <Route
                        exact
                        path="/inventory"
                        element={<Inventory />}
                    ></Route>
                    <Route exact path="/drivers" element={<Drivers />}></Route>
                    <Route
                        exact
                        path="/accident"
                        element={<Accident />}
                    ></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
