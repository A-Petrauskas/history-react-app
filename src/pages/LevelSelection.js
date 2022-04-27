import LevelList from "../Components/Stateful/LevelList";
import NavigationButton from "../Components/Stateless/NavigationButton";


export default LevelSelection;

function LevelSelection() {
    return (
        <div style={textStyle}>
            <h1 style={{ marginTop: "30px", fontFamily: "'Oleo Script', cursive", fontSize: "60px" }}>Test Your Knowledge!</h1>

            <NavigationButton destination={"Create"} />

            <div style={header2Style}>
                <h2 style={{
                    backgroundColor: "#EBDDD6",
                    width: "60%",
                    height: "100px"
                }}> Click Play to test yourself on the topic or explore them by clicking Learn</h2>
            </div>

            <LevelList />
        </div>
    )
}

const textStyle = {
    textAlign: "center",
    fontFamily: "Oswald, sans-serif"
}

const header2Style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "100px"
}