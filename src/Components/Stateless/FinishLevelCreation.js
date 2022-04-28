import LevelInfoForm from "../Stateful/LevelInfoForm";

export default FinishLevelCreation;

function FinishLevelCreation({ addedEvents, setCreatedLevel, fullDates }) {

    return (
        <>
            <LevelInfoForm addedEvents={addedEvents} setCreatedLevel={setCreatedLevel} fullDates={fullDates} />
        </>
    )
}