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
    border: "solid #123C69",
    borderWidth: "0 2px 2px 0",
    display: "inline-block",
    transform: "rotate(-45deg)",
    WebkitTransform: "rotate(-45deg)",
    height: "30px",
    width: "30px",
    marginTop: "10px"
}

const arrowLine = {
    width: "90%",
    borderBottom: "2px solid #123C69",
    display: "inline-block",
    marginBottom: "14px"
}

const arrowStyle = {
    display: "block"
}