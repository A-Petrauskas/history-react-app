import { useEffect, useState } from "react";
import LevelList from "../Components/Stateless/LevelList";
import NavigationButton from "../Components/Stateless/NavigationButton";


export default LevelSelection;

function LevelSelection() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [levels, setLevels] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/levels")
            .then(response => response.json())
            .then(levels => {
                setLevels(levels);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
            })

    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (isLoading) {
        return <div>Loading...</div>;
    } else {
        return (
            <div style={textStyle}>
                <h1 style={{ marginTop: "30px", fontFamily: "'Oleo Script', cursive", fontSize: "50px" }}>Test Your Knowledge!</h1>

                <NavigationButton destination={"Create"} />

                <div style={header2Style}>
                    <h2 style={explanationStyle}> Click PLAY to test yourself on the topic or explore it by clicking LEARN</h2>
                </div>

                <LevelList levels={levels} />
            </div>
        )
    }
}

const textStyle = {
    textAlign: "center",
    fontFamily: "Oswald, sans-serif"
}

const header2Style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "70px"
}

const explanationStyle = {
    backgroundColor: "#EBDDD6",
    width: "60%",
    height: "75px",
    fontSize: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}