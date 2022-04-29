import { Card } from 'react-bootstrap';
import { Draggable } from 'react-beautiful-dnd';

export default EventCardSmallDraggable;

function EventCardSmallDraggable({ description, imageSrc, date, id, index }) {
    function GetWordApproxCount(description) {
        return description.split(" ").length - 1;
    }


    if (description && GetWordApproxCount(description) > 3) {
        return (
            <div style={cardSeparation} key={id}>
                <Draggable draggableId={id} index={index}>
                    {(provided, snapshot) => (

                        <Card {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                            style={getEventStyle(provided.draggableProps.style, snapshot.isDragging, snapshot.draggingOver)}>
                            <Card.Img variant="left" src={imageSrc} style={imageStyle} />
                            <Card.Body>
                                <Card.Title style={{ fontSize: "15px" }}>{description}</Card.Title>
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

    return (
        <div style={cardSeparation} key={id}>
            <Draggable draggableId={id} index={index}>
                {(provided, snapshot) => (

                    <Card {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                        style={getEventStyle(provided.draggableProps.style, snapshot.isDragging, snapshot.draggingOver)}>
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

const getEventStyle = (draggableStyle, isDragging, draggingOver) => {
    if (!draggingOver || draggingOver === "allEvents") {
        return {
            flexDirection: "row",
            fontWeight: "bold",
            minWidth: "300px",
            maxWidth: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "8px",
            textAlign: "center",
            backgroundColor: isDragging ? "#E2AAA2" : "#EEE2DC",

            ...draggableStyle
        }
    }
    else {
        return {
            flexDirection: "row",
            fontWeight: "bold",
            minWidth: "300px",
            maxWidth: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "8px",
            textAlign: "center",
            backgroundColor: isDragging ? "#EEE2DC" : "#EEE2DC", transition: "all .8s ease",

            ...draggableStyle
        }
    }
};