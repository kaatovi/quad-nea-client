import AsteroidCard from "./AsteroidCard";

// Function to display list of asteroids
function AsteroidList({ asteroids }) {
    if(asteroids.length === 0) {
        return <p>No asteroids found.</p>;
    }

    // Render list of asteroids using map to create an AsteroidCard for each asteroid
    return (
        <ul>
            {asteroids.map((asteroid) => (
                <AsteroidCard key={asteroid.id} asteroid={asteroid} />
            ))}
        </ul>
    );
}

export default AsteroidList;