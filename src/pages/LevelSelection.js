import LevelList from "../Components/Stateful/LevelList";
import NavigationButton from "../Components/Stateless/NavigationButton";


export default LevelSelection;

function LevelSelection() {
    return (
        <div style={textStyle}>
            <h1 style={{ marginTop: "20px" }}>Test Your Knowledge!</h1>

            <NavigationButton destination={"Create"} />

            <LevelList />
        </div>
    )
}

const textStyle = {
    textAlign: "center",
    fontFamily: "Oswald, sans-serif"
}