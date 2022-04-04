import { Droppable } from "react-beautiful-dnd";
import EventCardSmallDraggable from "./EventCardSmallDraggable";


export default SmallEventCardList

function SmallEventCardList({ addedEvents, eventIdName, droppableIdName, isDropDisabled }) {
    return (
        <div style={addedEventsStyle}>
            <Droppable droppableId={droppableIdName} direction={"vertical"} isDropDisabled={isDropDisabled}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}
                        style={wrapper}>
                        {addedEvents.map((event, i) => (
                            <EventCardSmallDraggable {...event} index={i} id={eventIdName + i} key={eventIdName + i} />
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
    height: "800px",
    width: "330px"
}