import { useState, useEffect } from 'react'
import AsteroidList from './AsteroidList'
import './App.css'

function App() {
  // Hooks to manage state for asteroids, loading, and error handling
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Grabs backend data (CORS) from the API and sets the state accordingly
  useEffect(() => {
    fetch("http://localhost:3000/api/asteroids")
      // Check response status
      .then((response) => {
        if(!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }
        return response.json();
      })
      // Response is ok
      .then((data) => {
        setAsteroids(data);
        setLoading(false);
      })
      // Response is not ok, handle error
      .catch((err) => {
        console.error("Failed to fetch asteroids", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading asteroids...</p>
  }

  if (error) {
    return <p>Something went wrong: {error}</p>;
  }

  // Render main application UI
  return (
    <div>
      <h1>NEA Watch</h1>
      <p>{asteroids.length} asteroids tracked</p>
      <AsteroidList asteroids={asteroids} />
    </div>
  );
}

export default App;