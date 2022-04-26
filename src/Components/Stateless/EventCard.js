import { Card } from 'react-bootstrap';
import { Draggable } from 'react-beautiful-dnd';

export default EventCard;

function EventCard({ name, description, imageSrc, id, index, dragDisabled }) {
    function GetWordApproxCount(description) {
        return description.split(" ").length - 1;
    }

    if (description && GetWordApproxCount(description) >= 2) {
        return (
            <div key={id}>
                <Draggable draggableId={id} index={index} isDragDisabled={dragDisabled}>
                    {(provided) => (

                        <Card {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                            style={getEventStyle2(provided.draggableProps.style)}>
                            <Card.Img variant="top" src={imageSrc} style={imageStyle2} />
                            <Card.Body>

                                <Card.Title style={{ fontSize: "15px" }}>{description}</Card.Title>
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
    pointerEvents: "none",
    borderRadius: "6px",
    paddingTop: "2px"
}

const getEventStyle = (draggableStyle) => ({
    userSelect: "none",
    margin: `0 20px 0 0`,
    maxWidth: "300px",
    minWidth: "204px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",


    ...draggableStyle
});

const getEventStyle2 = (draggableStyle) => ({
    userSelect: "none",
    margin: `0 20px 0 0`,
    maxWidth: "200px",
    minWidth: "162px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",


    ...draggableStyle
});

const imageStyle2 = {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    pointerEvents: "none",
    borderRadius: "6px",
    paddingTop: "2px"
}