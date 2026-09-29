function AsteroidCard({ asteroid }) {
    return (
        <li>
            <strong>{asteroid.name}</strong>
            <div>{Number(asteroid.miss_distance_km).toLocaleString()} km away</div>
            <div>Diameter: {asteroid.diameter_km} km</div>
            {asteroid.hazardous && <span> Potentially hazardous</span>}
        </li>
    );
}

export default AsteroidCard;