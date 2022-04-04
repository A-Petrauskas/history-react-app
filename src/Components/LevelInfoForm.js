import { useEffect, useState } from "react";
import FormImageUpload from "./FormImageUpload";

export default LevelInfoForm;

function LevelInfoForm({ addedEvents }) {
    const [levelInfo, setLevelInfo] = useState({
        name: "",
        description: "",
        timeConstraint: undefined,
        mistakes: undefined,
        imageSrc: undefined,
        events: []
    });

    useEffect(() => {
        setLevelInfo(values => ({ ...values, events: addedEvents }))
    }, [addedEvents]);

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setLevelInfo(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(levelInfo);
        //TODO: FETCH POST
    }

    return (
        <div style={formStyle}>

            {levelInfo.imageSrc &&
                <img src={levelInfo.imageSrc} alt={"Represents the level being created"} style={imageStyle} />}

            {!levelInfo.imageSrc &&
                <div style={imagePlaceholder}></div>
            }

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Level Name"
                    name="name"
                    value={levelInfo.name || ""}
                    onChange={handleChange} />

                <input
                    type="text"
                    placeholder="Level Description"
                    name="description"
                    value={levelInfo.description || ""}
                    onChange={handleChange} />

                <input
                    type="number"
                    placeholder="Time Constraint"
                    name="timeConstraint"
                    value={levelInfo.timeConstraint || ""}
                    onChange={handleChange} />

                <input
                    type="number"
                    placeholder="Allowed number of mistakes"
                    name="mistakes"
                    value={levelInfo.mistakes || ""}
                    onChange={handleChange} />


                <FormImageUpload setInputs={setLevelInfo} />

                <input type="submit" />
            </form>
        </div>
    );
}

const formStyle = {
    gridRow: "4 / 5",
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