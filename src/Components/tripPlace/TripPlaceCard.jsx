// src/Components/tripPlace/TripPlaceCard.jsx
import "./tripPlaceCard.scss";
import PropTypes from "prop-types";
import Loading from "../loading/Loading";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faThumbsUp,
  faEye,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_BASE_URL;

export default function TripPlaceCard({ tripPlace }) {
  // const navigate = useNavigate();
  const [place, setPlace] = useState();
  const [info, setInfo] = useState(false);

  const toggleInfo = () => {
    setInfo(!info);
  };

  useEffect(() => {
    const url = `${API}/places/${tripPlace.id}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => setPlace(res))
      .catch((error) => console.log(error));
  }, [tripPlace.id]);

  return (
    <div className="trip-place-card">
      {!place ? (
        <Loading message="Loading Place" />
      ) : (
        <>
          <img
            src={place.image || "trip-placeholder.jpg"}
            alt={place.name}
            className="trip-place-card__image"
          />
          <h1 className="trip-place-card__name">{place.name}</h1>
          {info && (
            <div className="trip-place-card__info">
              <p className="trip-place-card__info-description">
                {place.description}
              </p>
              <p className="trip-place-card__info-city">
                City: <span>{place.city}</span>
              </p>

              <p className="trip-place-card__info-address">
                Address: <span>{place.address}</span>
              </p>
            </div>
          )}
          <div className="trip-place-card__controls">
            <FontAwesomeIcon
              className={`trip-place-card__controls-info${
                info ? " selected" : ""
              }`}
              icon={faCircleInfo}
              onClick={toggleInfo}
            />
            <FontAwesomeIcon
              className={`trip-place-card__controls-like${
                tripPlace.is_favorite ? " selected" : ""
              }`}
              icon={faThumbsUp}
            />
            <FontAwesomeIcon
              className={`trip-place-card__controls-visit${
                tripPlace.visited ? " selected" : ""
              }`}
              icon={faEye}
            />
            <FontAwesomeIcon
              className="trip-place-card__controls-delete"
              icon={faTrashCan}
            />
          </div>
        </>
      )}
    </div>
  );
}

TripPlaceCard.propTypes = {
  tripPlace: PropTypes.shape({
    id: PropTypes.number.isRequired,
    is_favorite: PropTypes.bool.isRequired,
    visited: PropTypes.bool.isRequired,
    trip_id: PropTypes.number.isRequired,
    place_id: PropTypes.number.isRequired,
  }),
};
