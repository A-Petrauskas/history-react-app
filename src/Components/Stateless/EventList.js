import React from "react";
import EventCard from './EventCard'
import { Droppable } from "react-beautiful-dnd";
import TimelineArrow from './TimelineArrow';

export default EventList;

function EventList({ placedEvents, direction, dragDisabled }) {
    return (
        <div style={placedEventsStyle}>
            <Droppable droppableId="placedEvents" direction={direction}>
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}
                        style={GetEventListStyle(snapshot.isDraggingOver)}>
                        {placedEvents.map((event, i) => (
                            <EventCard {...event} index={i} id={'Card-' + i} dragDisabled={dragDisabled} key={'Card-' + i} />
                        ))}

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            <TimelineArrow />
        </div>

    );
}

const GetEventListStyle = (isDraggingOver) => ({
    padding: "50px",
    backgroundColor: isDraggingOver ? "#CE7264" : "#DDC6BB",
    overflowX: "hidden",
    display: "flex",
    maxHeight: "350px",
    transition: "all .7s ease",
});

const placedEventsStyle = {
    marginTop: "50px",
    position: "fixed",
    width: "100%",
    top: "50%"
}