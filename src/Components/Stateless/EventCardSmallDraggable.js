import { Card } from 'react-bootstrap';
import { Draggable } from 'react-beautiful-dnd';

export default EventCardSmallDraggable;

function EventCardSmallDraggable({ description, imageSrc, date, id, index }) {

    return (
        <div style={cardSeparation} key={id}>
            <Draggable draggableId={id} index={index}>
                {(provided) => (

                    <Card {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                        style={getEventStyle(provided.draggableProps.style)}>
                        <Card.Img variant="left" src={imageSrc} style={imageStyle} />
                        <Card.Body>
                            <Card.Title>{description}</Card.Title>
                            <Card.Text>
                                {date}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )}

            </Draggable>
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
    padding: "4px",
    marginLeft: "auto",
    marginRight: "auto",
    MozUserSelect: "none",
    WebkitUserSelect: "none",
    msUserSelect: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const getEventStyle = (draggableStyle) => ({
    flexDirection: "row",
    background: "#EEE2DC",
    fontWeight: "bold",
    minWidth: "300px",
    maxWidth: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    textAlign: "center",

    ...draggableStyle
});