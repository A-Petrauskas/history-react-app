export default TimelineArrow;

function TimelineArrow() {

    return (
        <div style={arrowStyle}>
            <div style={arrowLine}></div>

            <div style={rightArrowTriangle}></div>
        </div>

    )
}

const rightArrowTriangle = {
    border: "solid grey",
    borderWidth: "0 5px 5px 0",
    display: "inline-block",
    transform: "rotate(-45deg)",
    WebkitTransform: "rotate(-45deg)",
    height: "30px",
    width: "30px",
    marginTop: "10px"
}

const arrowLine = {
    width: "90%",
    borderBottom: "3px solid grey",
    display: "inline-block",
    marginBottom: "14px"
}

const arrowStyle = {
    display: "block"
}