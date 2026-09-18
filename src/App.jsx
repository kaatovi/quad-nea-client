import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/asteroids")
      .then((response) => response.json())
      .then((data) => {
        setAsteroids(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch asteroids:", error);
        setLoading(false);
      }); 
  }, []);

  if (loading) {
    return <p>Loading asteroids...</p>
  }

  return (
    <div>
      <h1>NEA Watch</h1>
      <p>{asteroids.length} asteroids found.</p>
      <ul>
        {asteroids.map((asteroid) => (
          <li key={asteroid.id}>
            {asteroid.name} - {asteroid.miss_distance_km} km away
            {asteroid.hazardous ? " (Hazardous)" : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;