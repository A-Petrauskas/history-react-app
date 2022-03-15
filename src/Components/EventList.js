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
                        <div key={'event-' + i}>
                            <EventCard {...event} index={i} id={'Card-' + i} />
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
    flexWrap: "wrap",
    padding: "10px",
    justifyContent: "center",
    paddingTop: "200px"
}