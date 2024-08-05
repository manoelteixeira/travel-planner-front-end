// src/Components/tripPlace/TripPlaceCard.jsx
import "./tripPlaceCard.scss";
import PropTypes from "prop-types";
import Loading from "../loading/Loading";
import { useEffect, useState } from "react";

const API = import.meta.env.VITE_BASE_URL;

export default function TripPlaceCard({ tripPlace }) {
  const [place, setPlace] = useState();

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
            src={place.image}
            alt={place.name}
            className="trip-place-card__image"
          />
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
