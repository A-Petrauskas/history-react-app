import { Card } from 'react-bootstrap';
import { Draggable } from 'react-beautiful-dnd';

export default EventCard;
//CHANGE INTO CONTEXT!!!!!!!!!!!!!! When it has already been fetched (not opened url directly)
function EventCard({ name, description, imageSrc, id, index, dragDisabled }) {
    return (
        //ADD BOTH NAME AND DESCRIPTION
        <div style={EventCardStyle}>
            <Draggable draggableId={id} index={index} isDragDisabled={dragDisabled}>
                {(provided) => (

                    <Card {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <Card.Img variant="top" src={imageSrc} />
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

const EventCardStyle = {

}