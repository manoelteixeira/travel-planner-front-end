// src/Pages/addPlace/AddPlace.jsx
import "./addPlace.scss";
import Loading from "../../Components/loading/Loading";
import PlaceCard from "../../Components/placeCard/PlaceCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API = import.meta.env.VITE_BASE_URL;

export default function AddPlace() {
  const { trip_id } = useParams();
  const [places, setPlaces] = useState();
  const [tripPlaces, setTripPlaces] = useState([]);

  useEffect(() => {
    const tripUrl = `${API}/trips/${trip_id}/places`;
    fetch(tripUrl)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.places);
        setTripPlaces(res.places);
      })
      .catch((error) => console.log(error))
      .finally((res) => {
        const placesUrl = `${API}/places`;
        fetch(placesUrl)
          .then((res) => res.json())
          .then((res) => setPlaces(res))
          .catch((error) => console.log(error));
      });
  }, []);

  return (
    <div className="add-places">
      {!places ? (
        <Loading message="Loading Places" />
      ) : (
        <>
          <div className="add-places__title">Add Some Places To Visit</div>
          <div className="add-places__items">
            {places.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                tripId={trip_id}
                tripPLaces={tripPlaces}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
