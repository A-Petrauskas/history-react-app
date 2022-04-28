import React from "react";
import EventCard from './EventCard'
import { Droppable } from "react-beautiful-dnd";
import TimelineArrow from './TimelineArrow';

export default EventList;

function EventList({ placedEvents, direction, dragDisabled }) {
    return (
        <div style={placedEventsStyle}>
            <Droppable droppableId="placedEvents" direction={direction}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}
                        style={wrapper}>
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

const wrapper = {
    padding: "50px",
    backgroundColor: "#DDC6BB",
    overflowX: "hidden",
    display: "flex",
    maxHeight: "350px"
}

const placedEventsStyle = {
    marginTop: "50px",
    position: "fixed",
    width: "100%",
    top: "50%"
}