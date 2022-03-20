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
                        <div key={'event-' + i} style={nonSelectable}>
                            <EventCard {...event} index={i} id={'Card-' + i} dragDisabled={true} />
                        </div>
                    ))}

                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}

const wrapper = {
    display: "flex",
    padding: "50px",
    justifyContent: "center",
    backgroundColor: "#CBD4C2"
}

const nonSelectable = {
    MozUserSelect: "none",
    WebkitUserSelect: "none",
    msUserSelect: "none"
}