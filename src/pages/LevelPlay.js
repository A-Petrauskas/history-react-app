import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EventList from "../Components/EventList"
import { Button } from 'react-bootstrap';


export default LevelPlay;

function LevelPlay() {
    const levelId = useParams();
    const [gameId, setGameId] = useState("");
    let [event] = useState(null);
    const [placedEvents, setPlacedEvents] = useState([]);

    //CHANGE INTO SINGLE POST METHOD AND CHECK BY USER COOKIE
    useEffect(() => {
        fetch("http://localhost:5000/history/game", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ levelId: levelId.id })
        })
            .then(response => response.json())
            .then(data => setGameId(data));
    }, []);


    useEffect(() => {
        if (gameId !== "") {
            fetch(`http://localhost:5000/history/game/${gameId}/event`)
                .then(response => response.json())
                .then(data => {
                    event = data;
                })
        }

    }, [placedEvents, gameId]);

    console.log(gameId);
    console.log(placedEvents);

    return (//FIX DATABASE
        <div style={textStyle}>
            <div>
                {placedEvents.length > 0 &&
                    <EventList placedEvents={placedEvents} />
                }
                <Button variant="danger" onClick={() => setPlacedEvents(prevArray => [...prevArray, event])}>
                    New Event!
                </Button>{''}
            </div>
        </div>
    )
}

const textStyle = {
    textAlign: "center"
}