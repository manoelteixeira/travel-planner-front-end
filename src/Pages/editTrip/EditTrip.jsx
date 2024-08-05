// src/Pages/editTrip/EditTrip.jsx
import "./editTrip.scss";
import TripForm from "../../Components/tripForm/TripForm";

export default function EditTrip() {
  return (
    <div className="new-trip">
      <h1 className="new-trip__title">Edit Trip</h1>
      <div className="new-trip__form">
        <TripForm />
      </div>
    </div>
  );
}
