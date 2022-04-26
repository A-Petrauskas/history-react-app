import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EventCardSmall from './EventCardSmall';

export default LevelCreatedWindow

function LevelCreatedWindow({ createdLevel }) {
    function refreshPage() {
        window.location.reload(false);
    }

    if (createdLevel.status === 409) {
        return (
            <div style={dimBackground}>
                <div style={boxStyle}>
                    <b style={{ fontSize: "30px" }}> Your Level</b>

                    <div style={{ marginTop: "20px" }}>
                        <b style={borderLine}> Was Not Created! :(</b>
                        <div style={{ marginTop: "20px" }}></div>
                        <b style={borderLine}> Error: Duplicate was found</b>
                    </div>

                    <div style={buttonsStyle}>
                        <Button variant="warning" style={CreateMoreButtonStyle} onClick={() => refreshPage()}>Create Again</Button>{''}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div style={dimBackground}>
            <div style={boxStyle}>
                <b style={{ fontSize: "30px" }}> Your Level</b>

                <div style={{ marginTop: "20px" }}>
                    <EventCardSmall imageSrc={createdLevel.imageSrc} description={createdLevel.name} date={createdLevel.description} />
                </div>

                <b style={borderLine}> Was successfully created!</b>

                <div style={buttonsStyle}>
                    <Link to={`/level/${createdLevel.id}/view`} state={createdLevel}>
                        <Button variant="primary" style={viewButtonStyle}>View Level</Button>{''}
                    </Link>

                    <Link to={`/level/${createdLevel.id}/play`}>
                        <Button variant="success" style={playButtonStyle}>Play Level</Button>{''}
                    </Link>

                    <Button variant="warning" style={CreateMoreButtonStyle} onClick={() => refreshPage()}>Create More</Button>{''}
                </div>
            </div>
        </div>
    )
}


const dimBackground = {
    background: "rgba(0, 0, 0, 0.82)",
    width: "100%",
    height: "100%",
    zIndex: "1000",
    position: "absolute",
    padding: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

const boxStyle = {
    minHeight: "400px",
    minWidth: "500px",
    maxWidth: "650px",
    position: "absolute",
    margin: "-25px 0 0 -25px",
    textAlign: "center",
    color: "black",
    fontSize: "large",
    background: "#EDC7B7"
}

const borderLine = {
    borderBottom: "1px solid black",
    margin: "10px 0px",
    display: "inline-block",
    marginTop: "20px",
    color: "#AC3B61",
    width: "300px",
    fontSize: "25px"
}

const playButtonStyle = {
    gridColumn: "3 / 4",
    gridRow: "1 / 2",
    width: "150px",
    justifySelf: "center"
}

const CreateMoreButtonStyle = {
    gridColumn: "2 / 3",
    gridRow: "1 / 2",
    width: "150px",
    height: "38px",
    justifySelf: "center"
}

const viewButtonStyle = {
    gridColumn: "1 / 2",
    gridRow: "1 / 2",
    width: "150px",
    height: "38px",
    justifySelf: "center"
}

const buttonsStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateRows: "55px",
    position: "absolute",
    bottom: "0",
    width: "100%"
}