// src/Components/tripForm/TripForm.jsx
import "./tripForm.scss";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API = import.meta.env.VITE_BASE_URL;

export default function TripForm() {
  const navigate = useNavigate();
  const { trip_id } = useParams();

  const [trip, setTrip] = useState({
    name: "",
    city: "",
    description: "",
    image: "",
  });

  const handleChange = (event) => {
    setTrip({ ...trip, [event.target.id]: event.target.value });
  };

  const createTrip = () => {
    const newTrip = {};
    for (const key in trip) {
      newTrip[key] = trip[key] == "" ? null : trip[key];
    }
    console.log(newTrip);
    const options = {
      method: "POST",
      body: JSON.stringify(newTrip),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = `${API}/trips`;
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => navigate(`/trip/${res.id}`))
      .catch((error) => console.log(error));
  };

  const updateTrip = () => {
    const updatedTrip = {};
    for (const key in trip) {
      updatedTrip[key] = trip[key] == "" ? null : trip[key];
    }
    const options = {
      method: "PUT",
      body: JSON.stringify(updatedTrip),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = `${API}/trips/${trip_id}`;
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => navigate(`/trip/${res.id}`))
      .catch((error) => console.log(error));
  };

  const handleSubmid = (event) => {
    event.preventDefault();
    if (trip_id) {
      updateTrip();
    } else {
      createTrip();
    }
  };

  // Load Trip
  useEffect(() => {
    if (trip_id) {
      const url = `${API}/trips/${trip_id}`;
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          for (const key in res) {
            res[key] = res[key] == null ? "" : res[key];
          }
          setTrip(res);
        })
        .catch((error) => console.log(error));
    }
  }, [trip_id]);

  return (
    <form className="trip-form" onSubmit={handleSubmid}>
      <input
        id="name"
        type="text"
        placeholder="Name"
        value={trip.name}
        onChange={handleChange}
        required
      />
      <input
        id="city"
        type="text"
        placeholder="City"
        value={trip.city}
        onChange={handleChange}
      />
      <input
        id="image"
        type="text"
        pattern="http[s]*://.+"
        placeholder="Image URL"
        value={trip.image}
        onChange={handleChange}
      />
      <textarea
        id="description"
        type="text"
        placeholder="Description"
        value={trip.description}
        onChange={handleChange}
      />
      <div className="trip-form__controls">
        <button className="trip-form__controls-submit">
          {trip_id ? "Edit" : "Create"}
        </button>
        <button
          className="trip-form__controls-cancel"
          onClick={() => {
            navigate("/home");
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
