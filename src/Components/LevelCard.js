import { Card, ListGroupItem, ListGroup, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default LevelCard;

function LevelCard({ name, mistakes, timeConstraint, description, eventCount, imageSrc, id }) {

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
                <Card.Img variant="top" src={imageSrc} style={imageStyle} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Events in level: {eventCount}</ListGroupItem>
                    <ListGroupItem>Allowed mistakes: {mistakes}</ListGroupItem>
                    <ListGroupItem>Time constraint: {secondsToMinutes(timeConstraint)}</ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <Link to={`/level/${id}/play`}>
                        <Button variant="primary">PLAY</Button>{''}
                    </Link>
                </Card.Body>
            </Card>
        </div>
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