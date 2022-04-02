import { Droppable } from "react-beautiful-dnd";
import EventCardSmallDraggable from "./EventCardSmallDraggable";


export default AddedEventsList

function AddedEventsList({ addedEvents }) {
    return (
        <div style={addedEventsStyle}>
            <Droppable droppableId="addedEvents" direction={"vertical"}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}
                        style={wrapper}>
                        {addedEvents.map((event, i) => (
                            <EventCardSmallDraggable {...event} index={i} id={'Card-' + i} key={'Card-' + i} />
                        ))}

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

const addedEventsStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

const wrapper = {
    backgroundColor: "#EDC7B7",
}