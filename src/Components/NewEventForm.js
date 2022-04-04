import { useState } from "react";
import EventImageUpload from "./EventImageUpload";

export default NewEventForm;

function NewEventForm({ setAddedEvents }) {
    const [inputs, setInputs] = useState({
        description: "",
        date: "",
        imageSrc: undefined
    });

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setAddedEvents(setEvents => [...setEvents, inputs]);
    }

    return (
        <div style={formStyle}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Event Description"
                    name="description"
                    value={inputs.description || ""}
                    onChange={handleChange} />

                <input
                    type="number"
                    placeholder="Date of Event"
                    name="date"
                    value={inputs.date || ""}
                    onChange={handleChange} />

                <EventImageUpload setInputs={setInputs} />

                <input type="submit" />
            </form>

            {inputs.imageSrc &&
                <img src={inputs.imageSrc} alt={"Represents newly created event"} />}
        </div>
    );
}

const formStyle = {
    gridRow: "1 / 2",
    gridColumn: "2 / 3"
}