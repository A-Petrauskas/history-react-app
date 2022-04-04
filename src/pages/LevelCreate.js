import NewEventForm from "../Components/NewEventForm";
import { DragDropContext } from "react-beautiful-dnd";
import React, { useEffect, useState } from 'react';
import SmallEventCardList from "../Components/SmallEventCardList";
import LevelInfoForm from "../Components/LevelInfoForm";

export default LevelCreate;

function LevelCreate() {
    const [addedEvents, setAddedEvents] = useState([]);
    const [allEvents, setAllEvents] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/history/events")
            .then(response => response.json())
            .then(events => {
                setAllEvents(events);
            })

    }, []);

    let onDragEnd = (result) => {
        const { destination, source } = result;

        if (source.droppableId === "newEvents" && !destination) {
            addedEvents.splice(source.index, 1);
        }
        else if (source.droppableId === "newEvents" && destination.droppableId !== "newEvents") {
            addedEvents.splice(source.index, 1);
        }
        else if (!destination) {
            return;
        }
        else if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const finish = reorder(addedEvents, source.index, destination.index)
        setAddedEvents(finish);

    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    return (
        <div style={centerPage}>
            <div style={pageStyle}>
                <div>
                    <NewEventForm setAddedEvents={setAddedEvents} />
                </div>

                <DragDropContext onDragEnd={onDragEnd}>
                    <div style={allEventsStyle}>
                        {allEvents.length > 0 &&
                            <SmallEventCardList addedEvents={allEvents} eventIdName={"oldEvent"}
                                droppableIdName={"allEvents"} isDropDisabled={true} />
                        }
                    </div>

                    <div style={newEventsStyle}>
                        <SmallEventCardList addedEvents={addedEvents} eventIdName={"newEvent"}
                            droppableIdName={"newEvents"} isDropDisabled={false} />
                    </div>
                </DragDropContext>

                <LevelInfoForm addedEvents={addedEvents} />
            </div>
        </div>
    )
}

const allEventsStyle = {
    overflowX: "auto",
    gridRow: "1 / 3",
    maxHeight: "800px",
    gridColumn: "1 / 2"
}

const newEventsStyle = {
    overflowX: "auto",
    gridRow: "1 / 3",
    maxHeight: "800px",
    gridColumn: "3 / 4"
}

const pageStyle = {
    display: "grid",
    gridTemplateColumns: "330px 500px 330px",
    gridTemplateRows: " 800px, 800px",
    gap: "50px",
    padding: "100px 50px 50px 50px"
}

const centerPage = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}