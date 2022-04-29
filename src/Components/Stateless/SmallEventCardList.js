import { Droppable } from "react-beautiful-dnd";
import EventCardSmallDraggable from "./EventCardSmallDraggable";


export default SmallEventCardList

function SmallEventCardList({ addedEvents, eventIdName, droppableIdName, isDropDisabled }) {
    return (
        <div style={addedEventsStyle}>
            <Droppable droppableId={droppableIdName} direction={"vertical"} isDropDisabled={isDropDisabled}>
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}
                        style={GetEventListStyle(snapshot.isDraggingOver, droppableIdName)}>
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

const GetEventListStyle = (isDraggingOver, droppableIdName) => {
    if (droppableIdName === "allEvents") {
        return {
            backgroundColor: "#DDC6BB",
            minHeight: "800px",
            width: "330px"
        }
    }
    else {
        return {
            backgroundColor: isDraggingOver ? "#D38073" : "#DDC6BB",
            minHeight: "800px",
            width: "330px",
            transition: "all .5s ease",
        }
    }
};