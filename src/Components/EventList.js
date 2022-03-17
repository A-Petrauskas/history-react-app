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

// Add styling to the droppable!!

// const PlacedEventsStyle = {
//     padding: "8px",
//     transition: "backround-color 0.5s ease",
//     backgroundColor: props => (props.isDraggingOver ? 'skyblue' : 'white'),
//     flexGrow: "1",
//     minHeight: "200px"
// }