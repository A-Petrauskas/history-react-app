export default ScoreInfo

function ScoreInfo({ currentScore }) {
    return (
        <div style={scoreStyle}>
            SCORE: {currentScore}
        </div>
    )
}

const scoreStyle = {
    position: "absolute",
    top: "8%",
    left: "8%",

    textShadow: "2px 2px 1px grey",
    fontSize: "60px",
    fontFamily: "Oswald, sans-serif"
}