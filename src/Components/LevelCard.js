import { Card, ListGroupItem, ListGroup, Button } from 'react-bootstrap';

export default LevelCard;
//CHANGE INTO CONTEXT!!!!!!!!!!!!!!
function LevelCard({ name, mistakes, timeConstraint, description, eventCount, imageSrc }) {
    return (

        <div>
            <Card style={{ width: '18rem' }} bg={"#FEF2D7"}>
                <Card.Img variant="top" src={imageSrc} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Events in level: {eventCount}</ListGroupItem>
                    <ListGroupItem>Allowed mistakes: {mistakes}</ListGroupItem>
                    <ListGroupItem>Time constraint: {timeConstraint}</ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <Button variant="primary">PLAY</Button>{''}
                </Card.Body>
            </Card>
        </div>
    )
}