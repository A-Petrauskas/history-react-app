import { useEffect, useState } from "react";

export default Game;

function Game() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [events, setEvents] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/history/events")
            .then(response => response.json())
            .then(events => {
                setEvents(events);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
            })

    }, []);

    useEffect(() => {
        console.log(events);
    }, [events])


    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (isLoading) {
        return <div>Loading...</div>;
    } else {
        return (
            events.map(event => <li key={event.id}>{event.description}</li>)
        );
    }
}