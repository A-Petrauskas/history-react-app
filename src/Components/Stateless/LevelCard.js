import { Card, ListGroupItem, ListGroup, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default LevelCard;

function LevelCard(props) {

    function secondsToMinutes(time) {
        let minutes = Math.floor(time / 60);
        let seconds = time - minutes * 60;

        let finalTime = prettyTime(minutes, '0', 2) + ':' + prettyTime(seconds, '0', 2);

        return finalTime;
    }

    function prettyTime(string, pad, length) {
        return (new Array(length + 1).join(pad) + string).slice(-length);
    }

    return (
        <div>
            <Card style={levelCardStyle} bg={"#FEF2D7"}>
                <Card.Img variant="top" src={props.imageSrc} style={imageStyle} />
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>
                        {props.description}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Events in level: {props.eventCount}</ListGroupItem>
                    <ListGroupItem>Allowed mistakes: {props.mistakes}</ListGroupItem>
                    <ListGroupItem>Time constraint: {secondsToMinutes(props.timeConstraint)}</ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <div style={buttonsStyle}>
                        <Link to={`/level/${props.id}/play`}>
                            <Button variant="primary" style={buttonPlayStyle}>PLAY</Button>{''}
                        </Link>

                        <Link to={`/level/${props.id}/view`} state={props}>
                            <Button variant="secondary" style={buttonLearnStyle}>LEARN</Button>{''}
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </div >
    )
}

const levelCardStyle = {
    fontFamily: "Oswald, sans-serif",
    width: '310px',
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

const imageStyle = {
    width: "300px",
    height: "200px",
    objectFit: "cover",
    pointerEvents: "none",
    borderRadius: "8px",
    paddingTop: "5px"
}

const buttonsStyle = {
    display: "flex",
    columnGap: "70px"
}

const buttonPlayStyle = {
    width: "100px",
    height: "38px",
    backgroundColor: "#5DA399",
    borderColor: "#5DA399"
}

const buttonLearnStyle = {
    width: "100px",
    height: "38px",
    backgroundColor: "#B3B7D1",
    borderColor: "#B3B7D1"
}