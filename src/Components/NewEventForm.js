import { useState } from "react";
import FormImageUpload from "./FormImageUpload";

export default NewEventForm;

function NewEventForm({ setAddedEvents, addedEvents }) {
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
        if (!addedEvents.some(e => e.description === inputs.description
            && e.date === inputs.date)) {

            setAddedEvents(setEvents => [...setEvents, inputs]);
        }
    }

    return (
        <div style={formStyle}>
            {inputs.imageSrc &&
                <img src={inputs.imageSrc} alt={"Represents newly created event"} style={imageStyle} />
            }

            {!inputs.imageSrc &&
                <div style={imagePlaceholder}></div>
            }

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

                <FormImageUpload setInputs={setInputs} />

                <input type="submit" />
            </form>
        </div>
    );
}

const formStyle = {
    gridRow: "2 / 3",
    gridColumn: "2 / 3"
}

const imageStyle = {
    width: "200px",
    height: "200px",
    objectFit: "cover",
    pointerEvents: "none"
}

const imagePlaceholder = {
    width: "200px",
    height: "200px",
    objectFit: "cover",
    pointerEvents: "none",
    background: "#BAB2B5",
    borderStyle: "dashed",
    borderColor: "grey"
}