import { useEffect, useState } from "react";
import EventImageUpload from "./EventImageUpload";

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
        <div>
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


                <EventImageUpload setInputs={setLevelInfo} />

                <input type="submit" />
            </form>

            {levelInfo.imageSrc &&
                <img src={levelInfo.imageSrc} alt={"Represents the level being created"} />}
        </div>
    );
}