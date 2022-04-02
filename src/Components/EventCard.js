import { Card } from 'react-bootstrap';
import { Draggable } from 'react-beautiful-dnd';

export default EventCard;

function EventCard({ name, description, imageSrc, id, index, dragDisabled }) {
    return (
        <div key={id}>
            <Draggable draggableId={id} index={index} isDragDisabled={dragDisabled}>
                {(provided) => (

                    <Card {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                        style={getEventStyle(provided.draggableProps.style)}>
                        <Card.Img variant="top" src={imageSrc} style={imageStyle} />
                        <Card.Body>
                            <Card.Title>{description}</Card.Title>
                            <Card.Text>
                                {name}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )}

            </Draggable>
        </div>
    )
}


const imageStyle = {
    width: "200px",
    height: "200px",
    objectFit: "cover",
    pointerEvents: "none"
}

const getEventStyle = (draggableStyle) => ({
    userSelect: "none",
    margin: `0 20px 0 0`,
    maxWidth: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",


    ...draggableStyle
});