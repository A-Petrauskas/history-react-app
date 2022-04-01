import React from "react";
import EventCard from './EventCard'
import { Droppable } from "react-beautiful-dnd";
import TimelineArrow from '../Components/TimelineArrow';

export default EventList;

function EventList({ placedEvents }) {
    return (
        <div>
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

            <TimelineArrow />
        </div>

    );
}

const wrapper = {
    padding: "50px",
    backgroundColor: "#EDC7B7",
    overflowX: "auto",
    display: "flex"
}