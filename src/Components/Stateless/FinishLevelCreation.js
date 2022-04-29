import LevelInfoForm from "../Stateful/LevelInfoForm";

export default FinishLevelCreation;

function FinishLevelCreation({ addedEvents, setCreatedLevel, fullDates }) {

    return (
        <div style={dimBackground}>
            <div style={nameDescribeStyle}>
                Name and describe your learning activity <br></br>
            </div>

            <div style={constraintsTextStyle}>
                Add constraints to make it interesting
            </div>

            <div style={pictureTextStyle}>
                Don't forget to select an image!
            </div>

            <div style={levelCreationBox}></div>

            <LevelInfoForm addedEvents={addedEvents} setCreatedLevel={setCreatedLevel} fullDates={fullDates} />
        </div>
    )
}

const dimBackground = {
    background: "rgba(24, 24, 24, 0.95)",
    width: "100%",
    height: "100%",
    zIndex: "1000",
    position: "absolute",
    padding: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

const nameDescribeStyle = {
    fontFamily: "'Oleo Script', cursive",
    fontSize: "50px",
    color: "#F3DACE",
    width: "1000px",
    height: "140px",
    position: "fixed",
    top: "15%",
    left: "30.5%"
}

const levelCreationBox = {
    marginTop: "50px",
    position: "fixed",
    width: "39%",
    top: "20%",
    height: "65%",
    borderStyle: "dashed",
    borderColor: "#F3DACE",
    borderWidth: "10px",
    left: "31.5%"
}

const constraintsTextStyle = {
    fontFamily: "'Oleo Script', cursive",
    fontSize: "50px",
    color: "#F3DACE",
    width: "340px",
    height: "30px",
    position: "fixed",
    top: "45%",
    left: "72%"
}

const pictureTextStyle = {
    fontFamily: "'Oleo Script', cursive",
    fontSize: "50px",
    color: "#F3DACE",
    width: "360px",
    height: "400px",
    position: "fixed",
    top: "32%",
    left: "14%"
}