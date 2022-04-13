import { useState } from "react";
import DateTypeButton from "./DateTypeButton";
import FormImageUpload from "./FormImageUpload";

export default NewEventForm;

function NewEventForm({ setAddedEvents, addedEvents, setFullDates, eventAdded }) {
    const [inputs, setInputs] = useState({
        description: undefined,
        date: undefined,
        imageSrc: undefined,
        image: null
    });

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!addedEvents.some(e => e.description === inputs.description
            && e.date === inputs.date) && inputs.description && inputs.date) {

            setAddedEvents(setEvents => [...setEvents, inputs]);
            setInputs({ ...inputs, ...{ date: "", description: "" } })
        }
    }

    return (
        <div style={formStyle}>
            <div style={formGrid}>

                {inputs.imageSrc &&
                    <img src={inputs.imageSrc} alt={"Represents newly created event"} style={imageStyle} />
                }

                {!inputs.imageSrc &&
                    <div style={imagePlaceholder}></div>
                }

                <form onSubmit={handleSubmit} style={formInputsGrid}>
                    <textarea
                        type="text"
                        placeholder="Event Description"
                        name="description"
                        value={inputs.description || ""}
                        onChange={handleChange}
                        style={{
                            gridRow: "1 / 2",
                            gridColumn: "2 / 3",
                            resize: "none"
                        }} />
                    <div style={{
                        gridRow: "2 / 3",
                        gridColumn: "2 / 3",
                        placeSelf: "center"
                    }}>
                        <DateTypeButton setFullDates={setFullDates} eventAdded={eventAdded} />

                        <input
                            type="text"
                            placeholder="Date of Event"
                            name="date"
                            value={inputs.date || ""}
                            onChange={handleChange}
                        />
                    </div>


                    <div>
                    </div>

                    <div style={{
                        gridRow: "3 / 4",
                        gridColumn: "1 / 2",
                        alignSelf: "start"
                    }}>
                        <FormImageUpload setInputs={setInputs} />
                    </div>

                    <input type="submit" style={{
                        gridRow: "3 / 4",
                        gridColumn: "2 / 3",
                        placeSelf: "center"
                    }} />
                </form>
            </div>
        </div>
    );
}

const formStyle = {
    gridRow: "1 / 4",
    gridColumn: "1 / 3"
}

const imageStyle = {
    width: "200px",
    height: "200px",
    objectFit: "cover",
    pointerEvents: "none",
    gridRow: "1 / 2",
    gridColumn: "1 / 3"
}

const imagePlaceholder = {
    width: "200px",
    height: "200px",
    objectFit: "cover",
    pointerEvents: "none",
    background: "#BAB2B5",
    borderStyle: "dashed",
    borderColor: "grey",
    gridRow: "1 / 2",
    gridColumn: "1 / 3"
}

const formGrid = {
    display: "grid",
    gridTemplateColumns: "250px 200px",
    gridTemplateRows: " 100px 100px 100px",
    gap: "5px",
}

const formInputsGrid = {
    gridRow: "1 / 4",
    gridColumn: "1 / 3",
    display: "grid",
    gridTemplateColumns: "250px 200px",
    gridTemplateRows: " 100px 110px 50px",
    gap: "5px",
}