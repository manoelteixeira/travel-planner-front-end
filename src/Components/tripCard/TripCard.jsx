// src/Components/tripCard/TripCard.jsx
import "./tripCard.scss";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faCircleInfo,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

const API = import.meta.env.VITE_BASE_URL;

export default function TripCard({ trip, deleteTrip }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    const url = `${API}/trips/${trip.id}`;
    const options = {
      method: "DELETE",
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        alert(`${res.name} Deleted.`);
        deleteTrip();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="trip-card">
      <img
        src={trip.image || "trip-placeholder.jpg"}
        alt={trip.name}
        className="trip-card__image"
      />
      <div className="trip-card__name">{trip.name}</div>

      <div className="trip-card__controls">
        <FontAwesomeIcon
          className="trip-card__controls-info"
          icon={faCircleInfo}
          onClick={() => navigate(`/trip/${trip.id}`)}
        />
        <FontAwesomeIcon
          className="trip-card__controls-edit"
          icon={faPenToSquare}
          onClick={() => navigate(`/trip/${trip.id}/edit`)}
        />
        <FontAwesomeIcon
          className="trip-card__controls-delete"
          icon={faTrashCan}
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}

TripCard.propTypes = {
  trip: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
  }),
  deleteTrip: PropTypes.func.isRequired,
};
