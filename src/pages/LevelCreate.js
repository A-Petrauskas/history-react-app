import NewEventForm from "../Components/NewEventForm";
import { DragDropContext } from "react-beautiful-dnd";
import React, { useEffect, useState } from 'react';
import SmallEventCardList from "../Components/SmallEventCardList";
import LevelInfoForm from "../Components/LevelInfoForm";
import LevelCreatedWindow from "../Components/LevelCreatedWindow";
import NavigationButton from "../Components/NavigationButton";

export default LevelCreate;

function LevelCreate() {
    const [addedEvents, setAddedEvents] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const [createdLevel, setCreatedLevel] = useState();
    const [fullDates, setFullDates] = useState(false);
    const [eventAdded, setEventAdded] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/history/events")
            .then(response => response.json())
            .then(events => {
                setAllEvents(events);
            })

    }, []);


    let onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (source.droppableId === "newEvents" && !destination) {
            addedEvents.splice(source.index, 1);
            if (addedEvents.length === 0) {
                setEventAdded(false);
            }
            return;
        }

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        if (destination.droppableId === source.droppableId) {
            let finish = reorder(addedEvents, source.index, destination.index)
            setAddedEvents(finish);
            return;
        }

        let idNumber = parseInt(draggableId.match(/\d+$/));

        if (addedEvents.some(e => e.description === allEvents[idNumber].description
            && e.date === allEvents[idNumber].date)) {
            return;
        }

        if ((fullDates && (allEvents[idNumber].date.match(new RegExp("-", "g")) || []).length === 2) ||
            (!fullDates && (allEvents[idNumber].date.match(new RegExp("-", "g")) || []).length !== 2)) {
            let finish = addedEvents.slice();
            finish.splice(destination.index, 0, allEvents[idNumber]);

            setAddedEvents(finish);
            setEventAdded(true);
        }
    }


    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    return (
        <div style={centerPage}>
            <NavigationButton destination={"Menu"} />

            {createdLevel &&
                <LevelCreatedWindow createdLevel={createdLevel} />
            }

            <div style={pageStyle}>
                <div>
                    <NewEventForm setAddedEvents={setAddedEvents}
                        addedEvents={addedEvents}
                        setFullDates={setFullDates}
                        eventAdded={eventAdded} />
                </div>

                <div style={premadeEventsStyle}>
                    Events you could use:
                </div>

                <div style={newEventsTextStyle}>
                    Events in your level:
                </div>

                <div style={createEventStyle}>
                    Create a new Event:
                </div>

                <div style={createLevelStyle}>
                    Finalise your level:
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

                <LevelInfoForm addedEvents={addedEvents} setCreatedLevel={setCreatedLevel} fullDates={fullDates} />
            </div>
        </div>
    )
}

const allEventsStyle = {
    overflowX: "auto",
    gridRow: "2 / 5",
    maxHeight: "800px",
    gridColumn: "1 / 2"
}

const newEventsStyle = {
    overflowX: "auto",
    gridRow: "2 / 5",
    maxHeight: "800px",
    gridColumn: "3 / 4"
}

const pageStyle = {
    display: "grid",
    gridTemplateColumns: "400px 500px 400px",
    gridTemplateRows: " 50px 300px 50px 300px",
    gap: "50px",
    padding: "30px 50px 30px 50px"
}

const centerPage = {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center"
}

const premadeEventsStyle = {
    gridRow: "1 / 2",
    gridColumn: "1 / 2",
    fontSize: "30px",
    fontFamily: "Oswald, sans-serif",
    textAlign: "center"
}

const newEventsTextStyle = {
    gridRow: "1 / 2",
    gridColumn: "3 / 4",
    fontSize: "30px",
    fontFamily: "Oswald, sans-serif",
    textAlign: "center"
}

const createEventStyle = {
    gridRow: "1 / 2",
    gridColumn: "2 / 3",
    fontSize: "30px",
    fontFamily: "Oswald, sans-serif",
    textAlign: "center"
}

const createLevelStyle = {
    gridRow: "3 / 4",
    gridColumn: "2 / 3",
    fontSize: "30px",
    fontFamily: "Oswald, sans-serif",
    textAlign: "center"
}