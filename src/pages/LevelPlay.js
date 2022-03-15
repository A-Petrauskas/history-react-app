import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EventList from "../Components/EventList"
import { Button } from "react-bootstrap";
import EventCard from "../Components/EventCard";
import { DragDropContext, Droppable } from "react-beautiful-dnd";


export default LevelPlay;

function LevelPlay() {
    const levelId = useParams();
    const [gameId, setGameId] = useState("");
    const [event, setEvent] = useState();
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
    }, [levelId]);


    useEffect(() => {
        if (gameId !== "") {
            fetch(`http://localhost:5000/history/game/${gameId}/event`)
                .then(response => response.json())
                .then(data => {
                    setEvent(data);
                })
        }

    }, [placedEvents, gameId]);

    console.log(gameId);
    console.log(placedEvents);
    console.log(event);

    let onDragEnd = result => {
    }

    return (//FIX DATABASE
        <DragDropContext onDragEnd={onDragEnd}>
            <div style={textStyle}>
                <Droppable droppableId="newEvent">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}
                            style={newEventStyle}>
                            <EventCard {...event} id={'Card-'} index={42069} />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                {placedEvents.length > 0 &&
                    <EventList placedEvents={placedEvents} />
                }
                <Button variant="danger" onClick={() => setPlacedEvents(prevArray => [...prevArray, event])}>
                    New Event!
                </Button>{''}
            </div>
        </DragDropContext>
    )
}

const textStyle = {
    textAlign: "center"
}

const newEventStyle = {
    display: "flex",
    flexWrap: "wrap",
    padding: "10px",
    justifyContent: "center",
    paddingTop: "100px"
}