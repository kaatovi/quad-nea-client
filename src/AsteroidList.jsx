import AsteroidCard from "./AsteroidCard";

// Function to display list of asteroids
function AsteroidList({ asteroids, watchedIds, canWatch, onWatch }) {
    if(asteroids.length === 0) {
        return <p>No asteroids found.</p>;
    }

    // Render list of asteroids using map to create an AsteroidCard for each asteroid
    return (
        <ul>
            {asteroids.map((asteroid) => (
                <AsteroidCard 
                    key={`${asteroid.neo_id}-${asteroid.close_approach_date}`} 
                    asteroid={asteroid} 
                    isWatched={watchedIds.has(asteroid.neo_id)}
                    canWatch={canWatch}
                    onWatch={onWatch}    
                />
            ))}
        </ul>
    );
}

export default AsteroidList;