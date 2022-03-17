import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import EventList from "../Components/EventList"
import EventCard from "../Components/EventCard";
import { DragDropContext, Droppable } from "react-beautiful-dnd";


export default LevelPlay;

function LevelPlay() {
    const levelId = useParams();
    const firstEvent = useRef(true);
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
                    if (firstEvent.current) {
                        setPlacedEvents([data]);
                        firstEvent.current = false;
                    }

                    setEvent(data);
                })
        }

    }, [placedEvents, gameId]);


    let onDragEnd = result => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const finish = placedEvents.slice();
        finish.splice(destination.index, 0, event);
        setPlacedEvents(finish);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div style={textStyle}>
                <Droppable droppableId="newEvent" isDropDisabled={true} direction="horizontal">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}
                            style={newEventStyle}>
                            <EventCard {...event} id={'newCard'} index={0} dragDisabled={false} />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <div style={placedEventsStyle}>
                    {placedEvents.length > 0 &&
                        <EventList placedEvents={placedEvents} />
                    }
                </div>
            </div>
        </DragDropContext>
    )
}

const textStyle = {
    textAlign: "center",
    position: "relative"
}

const newEventStyle = {
    display: "flex",
    flexWrap: "wrap",
    padding: "100px",
    justifyContent: "center",
    paddingTop: "100px",
}

const placedEventsStyle = {
    marginTop: "50px",
}