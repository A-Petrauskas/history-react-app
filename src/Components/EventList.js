import React from "react";
import EventCard from './EventCard'

export default EventList;

function EventList({ placedEvents }) {
    return (
        <>
            <div style={wrapper}>
                {placedEvents.map((event, i) => (
                    <div key={'event-' + i}>
                        <EventCard {...event} />
                    </div>
                ))}
            </div>
        </>
    );
}

const wrapper = {
    display: "flex",
    flexWrap: "wrap",
    padding: "10px",
    justifyContent: "center",
    paddingTop: "400px"
}