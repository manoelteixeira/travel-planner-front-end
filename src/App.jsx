// src/App.jsx
import "./styles/App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/navbar/Navbar";
import Home from "./Pages/home/Home";
import NewTrip from "./Pages/newTrip/NewTrip";
import EditTrip from "./Pages/editTrip/EditTrip";
import NewPlace from "./Pages/newPlace/NewPlace";
import ShowTrip from "./Pages/showTrip/ShowTrip";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={"/home"} replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/new-trip" element={<NewTrip />} />
        <Route path="/new-place" element={<NewPlace />} />
        <Route path="/trip/:trip_id" element={<ShowTrip />} />
        <Route path="/trip/:trip_id/edit" element={<EditTrip />} />
      </Routes>
    </div>
  );
}

export default App;
