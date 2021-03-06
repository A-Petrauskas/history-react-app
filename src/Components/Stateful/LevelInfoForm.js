import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import FormImageUpload from "./FormImageUpload";

export default LevelInfoForm;

function LevelInfoForm({ addedEvents, setCreatedLevel, fullDates }) {
    const [levelInfo, setLevelInfo] = useState({
        name: NaN,
        description: NaN,
        timeConstraint: NaN,
        mistakes: NaN,
        imageSrc: undefined,
        image: null,
        fullDates: false,
        events: []
    });

    useEffect(() => {
        setLevelInfo(values => ({ ...values, events: addedEvents }))
    }, [addedEvents]);

    useEffect(() => {
        setLevelInfo(values => ({ ...values, fullDates: fullDates }))
    }, [fullDates]);

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setLevelInfo(values => ({ ...values, [name]: value }))
    }

    function CreateFormData() {
        var formData = new FormData();

        for (var key in levelInfo) {
            if (key === "events") {
                for (let i = 0; i < levelInfo[key].length; i++) {
                    formData.append(
                        `events[${i}].description`,
                        levelInfo[key][i].description
                    );

                    formData.append(
                        `events[${i}].date`,
                        levelInfo[key][i].date
                    );

                    formData.append(
                        `events[${i}].imageSrc`,
                        levelInfo[key][i].imageSrc
                    );

                    if (levelInfo[key][i].image) {
                        formData.append(
                            `events[${i}].image`,
                            levelInfo[key][i].image
                        );
                    }
                    else {
                        formData.append(
                            `events[${i}].image`,
                            null
                        );
                    }
                }
            }
            else if (key === "timeConstraint") {
                formData.append(key, convertTime(levelInfo[key]))
            }
            else {
                formData.append(key, levelInfo[key]);
            }
        }

        return formData;
    }

    function postLevel() {
        fetch("http://localhost:5000/creation", {
            method: 'POST',
            body: CreateFormData()
        })
            .then(response => response.json())
            .then(data => {
                setCreatedLevel(data);
                setCreatedLevel(values => ({ ...values, "imageSrc": levelInfo.imageSrc }))
            })
    }

    function convertTime(timeMinutes) {
        let minutes = parseInt(timeMinutes.substring(0, 2));
        let seconds = parseInt(timeMinutes.substring(3, 5));

        let timeSeconds = (minutes * 60 + seconds).toString();

        return timeSeconds;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (levelInfo.description &&
            levelInfo.name && levelInfo.timeConstraint &&
            levelInfo.mistakes && levelInfo.image
            && /^\d{2}:\d{2}$/.test(levelInfo.timeConstraint)) {



            postLevel();
        }
    }

    return (
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
                        gridColumn: "2 / 3",
                        backgroundColor: "#F1E8E4"
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
                        resize: "none",
                        backgroundColor: "#F1E8E4"
                    }} />

                <input
                    type="text"
                    placeholder="Time Constraint (min:sec)"
                    name="timeConstraint"
                    value={levelInfo.timeConstraint || ""}
                    onChange={handleChange}
                    style={{
                        gridRow: "3 / 4",
                        gridColumn: "2 / 3",
                        backgroundColor: "#F1E8E4"
                    }} />

                <input
                    type="number"
                    placeholder="Number of mistakes"
                    name="mistakes"
                    value={levelInfo.mistakes || ""}
                    onChange={handleChange}
                    style={{
                        gridRow: "4 / 5",
                        gridColumn: "2 / 3",
                        backgroundColor: "#F1E8E4"
                    }} />

                <div style={{
                    gridRow: "4 / 5",
                    gridColumn: "1 / 2",
                    alignSelf: "center",
                    paddingTop: "130px"
                }}>
                    <FormImageUpload setInputs={setLevelInfo} />
                </div>

                <Button variant="secondary" type="submit" value={"Add Event"} style={createButtonStyle}
                >Create Activity!</Button>{' '}
            </form>
        </div>
    );
}

const imageStyle = {
    width: "295px",
    height: "295px",
    objectFit: "cover",
    pointerEvents: "none",
    gridRow: "1 / 2",
    gridColumn: "1 / 3"
}

const imagePlaceholder = {
    width: "295px",
    height: "295px",
    objectFit: "cover",
    pointerEvents: "none",
    background: "rgba(208, 175, 159, 0.95)",
    borderStyle: "dashed",
    borderColor: "#F3DACE",
    borderWidth: "10px",
    gridRow: "1 / 2",
    gridColumn: "1 / 3"
}

const formGrid = {
    display: "grid",
    gridTemplateColumns: "250px 200px",
    gridTemplateRows: " 100px 100px 100px",
    gap: "5px",
    position: "fixed",
    left: "35%",
    top: "30%"
}

const formInputsGrid = {
    gridRow: "1 / 4",
    gridColumn: "1 / 3",
    display: "grid",
    gridTemplateColumns: "300px 300px",
    gridTemplateRows: " 50px 100px 50px 50px 50px",
    gap: "15px",
    position: "fixed",
    left: "35%",
    top: "30%"
}

const createButtonStyle = {
    width: "240px",
    height: "70px",
    fontSize: "20px",
    backgroundColor: "#5DA399",
    borderColor: "#5DA399",
    position: "fixed",
    bottom: "15%",
    left: "45%"
}