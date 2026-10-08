import { useState, useEffect } from 'react'
import { apiFetch } from './api'
import AuthForm from './AuthForm'
import AsteroidList from './AsteroidList'
import './App.css'

function App() {
  // Hooks to manage state for asteroids, loading, and error handling
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [watchedIds, setWatchedIds] = useState(new Set());
  const [showWatchedOnly, setShowWatchedOnly] = useState(false);

  function handleLogout() {
    localStorage.removeItem('token');
    setToken(null);
    setShowWatchedOnly(false);
  }
  
  useEffect(() => {
    apiFetch('/asteroids')
      .then(setAsteroids)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if(!token) {
      setWatchedIds(new Set());
      return;
    }

    apiFetch('/watchlist')
      .then((data) => setWatchedIds(new Set(data.map((a) => a.neo_id))))
      .catch((err) => {
        if(err.status === 401) handleLogout();
      });
  }, [token]);

  async function handleWatch(asteroidId) {
    try{
      await apiFetch('/watchlist', {
        method: "POST",
        body: JSON.stringify({asteroidId}),
      });
      setWatchedIds((prev) => new Set(prev).add(asteroidId));
    } catch(err) {
      if(err.status === 401) handleLogout();
      else setError(err.message);
    }
  }

  if(loading) return <p>Loading asteroids...</p>;
  if(error) return <p>Something went wrong: {error}</p>

  const visibleAsteroids = showWatchedOnly
    ? asteroids.filter((a) => watchedIds.has(a.neo_id))
    : asteroids;

  return (
    <div>
      <h1>NEA Watch</h1>
      {token ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <label>
            <input
              type="checkbox"
              checked={showWatchedOnly}
              onChange={(e) => setShowWatchedOnly(e.target.checked)}
            />
            Show my watchlist only
          </label>
        </div>
      ) : (
        <AuthForm onLoggedIn={setToken} />
      )}

      <p>{visibleAsteroids.length} asteroids shown</p>
      <AsteroidList
        asteroids={visibleAsteroids}
        watchedIds={watchedIds}
        canWatch={Boolean(token)}
        onWatch={handleWatch}
      />
    </div>
  );
}

export default App;