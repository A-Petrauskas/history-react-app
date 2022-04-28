import { useState } from "react";
import DateTypeButton from "./DateTypeButton";
import FormImageUpload from "./FormImageUpload";
import { Button } from 'react-bootstrap';

export default NewEventForm;

function NewEventForm({ setAddedEvents, addedEvents, setFullDates, eventAdded, fullDates, setEventAdded }) {
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

            if ((fullDates && /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(inputs.date)) ||
                ((!fullDates && /^\d{4}( BC)?$/.test(inputs.date)))) {
                setAddedEvents(setEvents => [...setEvents, inputs]);
                setEventAdded(true);
                setInputs({ ...inputs, ...{ date: "", description: "" } })
            }
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
                            placeholder={fullDates ? "YYYY-MM-DD" : "YYYY (BC)"}
                            name="date"
                            value={inputs.date || ""}
                            onChange={handleChange}
                        />
                    </div>


                    <div>
                    </div>

                    <div style={{
                        gridRow: "2 / 3",
                        gridColumn: "1 / 2",
                        alignSelf: "end"
                    }}>
                        <FormImageUpload setInputs={setInputs} />
                    </div>

                    <Button variant="secondary" type="submit" value={"Add Event"} style={{
                        gridRow: "3 / 4",
                        gridColumn: "2 / 3",
                        placeSelf: "end",
                        width: "200px"
                    }}
                    >Add Event ➔</Button>{' '}
                </form>
            </div>
        </div>
    );
}

const formStyle = {
    gridRow: "3 / 4",
    gridColumn: "2 / 3",
    backgroundColor: "#EBDDD6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    gap: "5px"
}

const formInputsGrid = {
    gridRow: "1 / 4",
    gridColumn: "1 / 3",
    display: "grid",
    gridTemplateColumns: "250px 200px",
    gridTemplateRows: " 140px 110px 50px",
    gap: "5px"
}