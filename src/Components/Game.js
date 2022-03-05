import { useEffect, useState } from "react";

export default Game;

function Game() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [events, setEvents] = useState(null);


    useEffect(() => {
        fetch("http://localhost:5000/history/events", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        })
            .then(result => result.json())
            .then(json => {
                setEvents(json);

            })
    }, []);


    useEffect(() => {
        console.log(events);
    }, [events])


    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <h3>New Event</h3>
                <ul>

                </ul>
            </>
        );
    }
}