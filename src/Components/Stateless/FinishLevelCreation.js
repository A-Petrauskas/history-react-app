import LevelInfoForm from "../Stateful/LevelInfoForm";

export default FinishLevelCreation;

function FinishLevelCreation({ addedEvents, setCreatedLevel, fullDates }) {

    return (
        <div style={dimBackground}>
            <LevelInfoForm addedEvents={addedEvents} setCreatedLevel={setCreatedLevel} fullDates={fullDates} />
        </div>
    )
}

const dimBackground = {
    background: "rgba(0, 0, 0, 0.87)",
    width: "100%",
    height: "100%",
    zIndex: "1000",
    position: "absolute",
    padding: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}