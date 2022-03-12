import { Card } from 'react-bootstrap';

export default EventCard;
//CHANGE INTO CONTEXT!!!!!!!!!!!!!! When it has already been fetched (not opened url directly)
function EventCard({ name, description, imageSrc }) {
    return (
        //ADD BOTH NAME AND DESCRIPTION
        <div>
            <Card style={{ width: '18rem' }} bg={"#FEF2D7"}>
                <Card.Img variant="top" src={imageSrc} />
                <Card.Body>
                    <Card.Title>{description}</Card.Title>
                    <Card.Text>
                        {name}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}