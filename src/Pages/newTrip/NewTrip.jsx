// src/Pages/newTrip/NewTrip.jsx
import "./newTrip.scss";
import TripForm from "../../Components/tripForm/TripForm";

export default function NewTrip() {
  return (
    <div className="new-trip">
      <h1 className="new-trip__title">Lets Plan A Trip ?</h1>
      <div className="new-trip__form">
        <TripForm />
      </div>
    </div>
  );
}
