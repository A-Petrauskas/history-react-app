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
    top: "14%",
    left: "12%",

    textShadow: "2px 2px 1px grey",
    fontSize: "45px",
    fontFamily: "Oswald, sans-serif"
}