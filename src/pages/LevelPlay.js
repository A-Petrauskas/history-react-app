import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import EventList from "../Components/EventList"
import EventCard from "../Components/EventCard";
import { DragDropContext, Droppable } from "react-beautiful-dnd";


export default LevelPlay;

function LevelPlay() {
    const levelId = useParams();
    const baseEvent = useRef(true);
    const placementIndex = useRef(-1);
    const mistakes = useRef(0);
    const mistakeMade = useRef(false);
    const [firstEvent, setFirstEvent] = useState(false);
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


    function fetchNextEvent() {
        return fetch(`http://localhost:5000/history/game/${gameId}`, { //<==============
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ placementIndex: placementIndex.current })
        })
            .then(response => response.json())
            .then(data => {
                if (baseEvent.current) {
                    setPlacedEvents([data]);
                    baseEvent.current = false;
                    setFirstEvent(true);
                    return;
                }

                if (data.mistakes !== mistakes.current) {
                    mistakeMade.current = true;
                    mistakes.current = data.mistakes;
                }

                //IF GAMEOVER => RETURN
                setEvent(data);
            })
    }

    useEffect(() => {
        if (gameId !== "") {
            fetchNextEvent();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameId, firstEvent]);


    let onDragEnd = result => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        placementIndex.current = destination.index;

        fetchNextEvent().then(() => {
            if (mistakeMade.current) {
                mistakeMade.current = false;
            }
            else {
                const finish = placedEvents.slice();
                finish.splice(destination.index, 0, event);
                setPlacedEvents(finish);
            }
        });

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
    justifyContent: "center"
}

const placedEventsStyle = {
    marginTop: "50px",
    position: "fixed",
    width: "100%",
    top: "500px"
}