import LevelList from "../Components/LevelList";

export default LevelSelection;

function LevelSelection() {
    return (
        <div style={textStyle}>
            <h1>Test Your Knowledge!</h1>
            <LevelList />
        </div>
    )
}

const textStyle = {
    textAlign: "center"
}