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
            <div style={formGrid}>

                {levelInfo.imageSrc &&
                    <img src={levelInfo.imageSrc} alt={"Represents the level being created"} style={imageStyle} />}

                {!levelInfo.imageSrc &&
                    <div style={imagePlaceholder}></div>
                }

                <form onSubmit={handleSubmit} style={formInputsGrid}>
                    <input
                        type="text"
                        placeholder="Level Name"
                        name="name"
                        value={levelInfo.name || ""}
                        onChange={handleChange}
                        style={{
                            gridRow: "1 / 2",
                            gridColumn: "2 / 3"
                        }} />

                    <textarea
                        type="text"
                        placeholder="Level Description"
                        name="description"
                        value={levelInfo.description || ""}
                        onChange={handleChange}
                        style={{
                            gridRow: "2 / 3",
                            gridColumn: "2 / 3",
                            resize: "none"
                        }} />

                    <input
                        type="number"
                        placeholder="Time Constraint"
                        name="timeConstraint"
                        value={levelInfo.timeConstraint || ""}
                        onChange={handleChange}
                        style={{
                            gridRow: "3 / 4",
                            gridColumn: "2 / 3"
                        }} />

                    <input
                        type="number"
                        placeholder="Allowed number of mistakes"
                        name="mistakes"
                        value={levelInfo.mistakes || ""}
                        onChange={handleChange}
                        style={{
                            gridRow: "4 / 5",
                            gridColumn: "2 / 3"
                        }} />

                    <div style={{
                        gridRow: "4 / 5",
                        gridColumn: "1 / 2",
                        alignSelf: "start"
                    }}>
                        <FormImageUpload setInputs={setLevelInfo} />
                    </div>

                    <input type="submit" style={{
                        gridRow: "5 / 6",
                        gridColumn: "2 / 3",
                        placeSelf: "center"
                    }} />
                </form>
            </div>
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
    gridTemplateRows: " 50px 100px 50px 50px 50px",
    gap: "5px",
}