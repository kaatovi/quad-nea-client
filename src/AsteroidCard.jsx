function AsteroidCard({ asteroid, isWatched, canWatch, onWatch }) {
    return (
        <li>
            <strong>{asteroid.name}</strong>
            <div>{Number(asteroid.miss_distance_km).toLocaleString()} km away</div>
            <div>Diameter: {asteroid.diameter_km} km</div>
            {asteroid.hazardous && <span> Potentially hazardous</span>}

            {canWatch && (
                <button onClick={() => onWatch(asteroid.neo_id)} disabled={isWatched}>
                    {isWatched ? "Watching" : "Watch"}
                </button>
            )}
        </li>
    );
}

export default AsteroidCard;