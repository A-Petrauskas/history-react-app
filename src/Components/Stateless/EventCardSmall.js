import { Card } from 'react-bootstrap';

export default EventCardSmall;

function EventCardSmall({ description, imageSrc, date }) {

    return (
        <div style={cardSeparation}>
            <Card style={cardStyle}>
                <Card.Img variant="left" src={imageSrc} style={imageStyle} />
                <Card.Body>
                    <Card.Title>{description}</Card.Title>
                    <Card.Text>
                        {date}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

const imageStyle = {
    width: "100px",
    height: "91px",
    objectFit: "cover",
    pointerEvents: "none",
    borderRadius: "8px"
}

const cardSeparation = {
    padding: "10px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    MozUserSelect: "none",
    WebkitUserSelect: "none",
    msUserSelect: "none"
}

const cardStyle = {
    flexDirection: "row",
    background: "#EEE2DC",
    fontWeight: "bold",
    borderRadius: "8px",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}