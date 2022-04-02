import NewEventForm from "../Components/NewEventForm";
import { DragDropContext } from "react-beautiful-dnd";
import React, { useState } from 'react';
import AddedEventsList from "../Components/AddedEventsList";
import LevelInfoForm from "../Components/LevelInfoForm";

export default LevelCreate;

function LevelCreate() {
    const [addedEvents, setAddedEvents] = useState([]);

    let onDragEnd = (result) => {
        const { destination, source } = result;

        if (!destination) {
            addedEvents.splice(source.index, 1);
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const finish = reorder(addedEvents, source.index, destination.index)
        setAddedEvents(finish);

    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    return (
        <div>
            <div>
                <NewEventForm setAddedEvents={setAddedEvents} />
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div >
                    {addedEvents.length > 0 &&
                        <AddedEventsList addedEvents={addedEvents} />
                    }
                </div>
            </DragDropContext>

            <LevelInfoForm addedEvents={addedEvents} />
        </div>
    )
}