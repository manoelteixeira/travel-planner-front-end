// src/Components/placeCard/PlaceCard.jsx
import "./placeCard.scss";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API = import.meta.env.VITE_BASE_URL;

export default function PlaceCard({ place, tripId, tripPLaces }) {
  const navigate = useNavigate();
  const [add, setAdd] = useState(
    tripPLaces.find((item) => item.place_id == place.id) == undefined
      ? false
      : true
  );

  const toggleAdd = () => {
    console.log(add);
    const newTripPlace = {
      trip_id: tripId,
      place_id: place.id,
      is_favorite: false,
      visited: false,
    };
    console.log(newTripPlace);
    const url = `${API}/trips/${tripId}/places`;
    const options = {
      method: "POST",
      body: JSON.stringify(newTripPlace),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        navigate(`/trip/${tripId}`);
      })
      .catch((error) => error);
  };

  return (
    <div className="place-card">
      <img src={place.image} alt={place.name} className="place-card__image" />
      <div className="place-card__name">{place.name}</div>
      <div className="place-card__description">{place.description}</div>
      <div className="place-card__city">
        City: <span>{place.city}</span>
      </div>
      <div className="place-card__address">
        Address: <span>{place.address}</span>
      </div>
      <div className="place-card__controls">
        <FontAwesomeIcon
          className={`place-card__controls-add${add ? " add" : ""}`}
          icon={faMapPin}
          onClick={toggleAdd}
        />
      </div>
    </div>
  );
}

PlaceCard.propTypes = {
  place: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }),
  trip_id: PropTypes.number,
  tripPLaces: PropTypes.array.isRequired,
};
