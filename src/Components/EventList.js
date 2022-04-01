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
                        <EventCard {...event} index={i} id={'Card-' + i} dragDisabled={true} key={'Card-' + i} />
                    ))}

                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}

const wrapper = {
    padding: "50px",
    backgroundColor: "#EDC7B7",
    overflowX: "auto",
    display: "flex"
}