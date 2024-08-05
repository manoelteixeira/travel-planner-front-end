// src/Pages/showTrip/ShowTrip.jsx
import "./showTrip.scss";

import Loading from "../../Components/loading/Loading";
import TripPlaceCard from "../../Components/tripPlace/TripPlaceCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API = import.meta.env.VITE_BASE_URL;

export default function ShowTrip() {
  const { trip_id } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const url = `${API}/trips/${trip_id}/places`;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((res) => setTrip(res))
      .catch((error) => console.log(error));
  }, [trip_id]);

  return (
    <div className="trip">
      {trip == null ? (
        <Loading message="Loading Trip" />
      ) : (
        <>
          <div className="trip__header">
            <img
              className="trip__header-image"
              src={trip.image || "trip-placeholder.jpg"}
              alt={trip.name}
            />
            <div className="trip__header-details">
              <h1 className="trip__header-title">{trip.name}</h1>
              {trip.city && <h2 className="trip__header-city">{trip.city}</h2>}
              {trip.description && (
                <p className="trip__header-description">{trip.description}</p>
              )}
            </div>
          </div>
          <div className="trip__places">
            {trip.places.map((place) => (
              <TripPlaceCard key={place.id} tripPlace={place} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
