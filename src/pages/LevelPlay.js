import { useParams } from "react-router-dom";


export default LevelPlay;

function LevelPlay() {
    let temp = useParams();

    return (
        <div style={textStyle}>
            <h1>GAMEPLAY POG</h1>
            <h2>{temp.id}</h2>
        </div>
    )
}

const textStyle = {
    textAlign: "center"
}