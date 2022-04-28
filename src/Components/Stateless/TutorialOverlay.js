import { Button } from 'react-bootstrap';

export default TutorialOverlay;

function TutorialOverlay({ setTutorialDone }) {

    return (
        <>
            <div style={dimBackground}>
                <div style={EventListRectStyle}></div>

                <div style={EventDragTextBoxStyle}>
                    Drag the event card to the timeline below.
                    Remember: Time flow is from left to right!
                </div>

                <div style={Arrow1Style}></div>
                <div style={Arrow2Style}></div>
                <div style={Arrow3Style}></div>

                <div style={LivesRemainingStyle}>
                    Lives remaining:
                </div>

                <div style={TimeLeftStyle}>
                    Time left:
                </div>

                <Button variant="outline-secondary" style={StartButtonStyle} onClick={() => { setTutorialDone(true) }}>Start</Button>{''}

                <div style={EventRectStyle}></div>
            </div>
        </>
    )
}


const dimBackground = {
    background: "rgba(0, 0, 0, 0.7)",
    width: "100%",
    height: "100%",
    zIndex: "1000",
    position: "absolute",
    padding: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

const EventListRectStyle = {
    marginTop: "50px",
    position: "fixed",
    width: "100%",
    top: "49%",
    height: "45%",
    borderStyle: "dashed",
    borderColor: "#F3DACE",
    borderWidth: "10px",
    background: "rgba(243, 218, 206, 0.1)"
}

const EventDragTextBoxStyle = {
    fontFamily: "'Oleo Script', cursive",
    fontSize: "35px",
    color: "#F3DACE",
    width: "300px",
    height: "220px",
    padding: "5px 5px 5px 5px",
    position: "fixed",
    top: "13%",
    left: "27%"
}

const EventRectStyle = {
    borderStyle: "dashed",
    borderColor: "rgba(243, 218, 206, 1)",
    borderWidth: "5px",
    top: "5%",
    left: "43.5%",
    position: "fixed",
    width: "230px",
    height: "300px",
    background: "rgba(243, 218, 206, 0.1)"
}

const Arrow1Style = {
    width: "0",
    height: "0",
    borderTop: "50px solid transparent",
    borderRight: "50px solid transparent",
    borderLeft: "50px solid rgba(243, 218, 206, 0.55)",
    position: "fixed",
    top: "37%",
    left: "41.5%"
}

const Arrow2Style = {
    width: "0",
    height: "0",
    borderTop: "40px solid transparent",
    borderRight: "40px solid transparent",
    borderLeft: "40px solid rgba(243, 218, 206, 0.75)",
    position: "fixed",
    top: "43%",
    left: "39%"
}

const Arrow3Style = {
    width: "0",
    height: "0",
    borderTop: "30px solid transparent",
    borderRight: "30px solid transparent",
    borderLeft: "30px solid rgba(243, 218, 206, 0.9)",
    position: "fixed",
    top: "48%",
    left: "37%"
}

const LivesRemainingStyle = {
    fontFamily: "'Oleo Script', cursive",
    fontSize: "35px",
    color: "#F3DACE",
    position: "fixed",
    top: "9.5%",
    right: "22%"
}

const TimeLeftStyle = {
    fontFamily: "'Oleo Script', cursive",
    fontSize: "35px",
    color: "#F3DACE",
    position: "fixed",
    top: "18.5%",
    right: "22%"
}

const StartButtonStyle = {
    position: "fixed",
    bottom: "10%",
    width: "200px",
    height: "80px",
    fontSize: "30px",
    boxShadow: "0px 15px 20px rgba(0, 0, 0, 0.2)",
    zIndex: "10002",
    background: "#EEE2DC",
    color: "#303030",
    fontFamily: "Oswald, sans-serif"
}