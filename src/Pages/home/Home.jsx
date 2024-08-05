// src/Pages/home/Home.jsx
import "./home.scss";
import Loading from "../../Components/loading/Loading";
import TripCard from "../../Components/tripCard/TripCard";
import { useEffect, useState } from "react";

const API = import.meta.env.VITE_BASE_URL;

export default function Home() {
  const [trips, setTrips] = useState();

  const deleteTrip = (id) => {
    const tripsCopy = [...trips];
    const tripIdx = tripsCopy.indexOf((trip) => trip.id == id);
    tripsCopy.splice(tripIdx, 1);
    setTrips(tripsCopy);
  };

  useEffect(() => {
    const url = `${API}/trips`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setTrips(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="home">
      <h1 className="home__title">Trips Plans</h1>
      <div className="home__content">
        {!trips ? (
          <Loading message="Loading Trips" />
        ) : (
          <>
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} deleteTrip={deleteTrip} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
