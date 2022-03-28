import React from "react";
import EventCard from './EventCard'
import { Droppable } from "react-beautiful-dnd";

export default EventList;

function EventList({ placedEvents }) {
    return (
        <Droppable droppableId="placedEvents" direction="horizontal">
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}
                    style={wrapper}>
                    {placedEvents.map((event, i) => (
                        <EventCard {...event} index={i} id={'Card-' + i} dragDisabled={true} />
                    ))}

                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}

const wrapper = {
    padding: "50px",
    backgroundColor: "#CBD4C2",
    overflowX: "auto",
    display: "flex"
}