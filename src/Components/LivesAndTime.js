export default LivesAndTime

function LivesAndTime() {
    return (
        <div style={livesTimePos}>
            <div style={livesStyle}>
                ❤️✖️
            </div>

            <div style={timeStyle}>
                time:
            </div>
        </div>
    )
}

const livesTimePos = {
    position: "absolute",
    top: "8%",
    right: "10%"
}

const livesStyle = {
    fontSize: "40px"
}

const timeStyle = {
    fontSize: "40px"
}