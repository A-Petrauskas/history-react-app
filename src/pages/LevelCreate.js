import NewEventForm from "../Components/Stateful/NewEventForm";
import { DragDropContext } from "react-beautiful-dnd";
import React, { useEffect, useState } from 'react';
import SmallEventCardList from "../Components/Stateless/SmallEventCardList";
import NavigationButton from "../Components/Stateless/NavigationButton";
import FinishLevelCreation from "../Components/Stateless/FinishLevelCreation";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default LevelCreate;

function LevelCreate() {
    const [addedEvents, setAddedEvents] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const [createdLevel, setCreatedLevel] = useState();
    const [fullDates, setFullDates] = useState(false);
    const [eventAdded, setEventAdded] = useState(false);
    const [finishLevel, setFinishLevel] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/events")
            .then(response => response.json())
            .then(events => {
                setAllEvents(events);
            })

    }, []);


    let onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (source.droppableId === "newEvents" && !destination) {
            addedEvents.splice(source.index, 1);
            if (addedEvents.length === 0) {
                setEventAdded(false);
            }
            return;
        }

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        if (destination.droppableId === source.droppableId) {
            let finish = reorder(addedEvents, source.index, destination.index)
            setAddedEvents(finish);
            return;
        }

        let idNumber = parseInt(draggableId.match(/\d+$/));

        if (addedEvents.some(e => e.description === allEvents[idNumber].description
            && e.date === allEvents[idNumber].date)) {
            return;
        }

        if ((fullDates && (allEvents[idNumber].date.match(new RegExp("-", "g")) || []).length === 2) ||
            (!fullDates && (allEvents[idNumber].date.match(new RegExp("-", "g")) || []).length !== 2)) {
            let finish = addedEvents.slice();
            finish.splice(destination.index, 0, allEvents[idNumber]);

            setAddedEvents(finish);
            setEventAdded(true);
        }
    }


    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    return (
        <div style={centerPage}>
            <NavigationButton destination={"Menu"} />

            {createdLevel &&
                <NavigationButton destination={"Menu"} gameOver={true} />
            }

            {createdLevel &&
                navigate(`/level/${createdLevel.id}/view`, { state: createdLevel })
            }

            <div style={pageStyle}>
                <div style={explanationStyle}>
                    <div style={firstRowStyle}>
                        Drag an event from the left column into the
                    </div>

                    <div style={secondRowStyle}>
                        right column to add it to your new learning activity
                    </div>

                    <div style={arrowStyle}>
                        <div style={arrowLine}></div>
                        <div style={rightArrowTriangle}></div>
                    </div>

                    <div style={fifthRowStyle}>
                        To remove an event from your learning activity<br></br>
                        just drag it outside of the column
                    </div>

                    <div style={arrowStyle2}>
                        <div style={leftArrowTriangle}></div>
                        <div style={arrowLine2}></div>
                    </div>

                    <div style={sixthRowStyle}>
                        Create a brand new event below <br></br>
                        and watch it appear on the right!
                    </div>

                    <div style={arrowDownStyle}></div>
                </div>

                <NewEventForm setAddedEvents={setAddedEvents}
                    addedEvents={addedEvents}
                    setFullDates={setFullDates}
                    eventAdded={eventAdded}
                    fullDates={fullDates}
                    setEventAdded={setEventAdded} />

                <div style={premadeEventsStyle}>
                    Events you could use:
                </div>

                <div style={newEventsTextStyle}>
                    Events in your learning activity:
                </div>

                <DragDropContext onDragEnd={onDragEnd}>
                    <div style={allEventsStyle}>
                        {allEvents.length > 0 &&
                            <SmallEventCardList addedEvents={allEvents} eventIdName={"oldEvent"}
                                droppableIdName={"allEvents"} isDropDisabled={true} />
                        }
                    </div>

                    <div style={newEventsStyle}>
                        <SmallEventCardList addedEvents={addedEvents} eventIdName={"newEvent"}
                            droppableIdName={"newEvents"} isDropDisabled={false} />
                    </div>
                </DragDropContext>

                <div style={finishButtonPos}>
                    <Button variant="primary" style={finishButtonStyle} onClick={() => { if (addedEvents.length >= 2) setFinishLevel(true) }}>Finish Level</Button>{''}
                </div>

                <div style={finishLevelTextStyle}>
                    Click here to finish creating
                    your learning activity ➔
                </div>
            </div>

            {finishLevel &&
                <FinishLevelCreation addedEvents={addedEvents} setCreatedLevel={setCreatedLevel} fullDates={fullDates} />
            }
        </div>
    )
}

const allEventsStyle = {
    overflowX: "auto",
    gridRow: "2 / 5",
    maxHeight: "800px",
    gridColumn: "1 / 2"
}

const newEventsStyle = {
    overflowX: "auto",
    gridRow: "2 / 5",
    maxHeight: "800px",
    gridColumn: "3 / 4"
}

const pageStyle = {
    display: "grid",
    gridTemplateColumns: "400px 500px 400px",
    gridTemplateRows: " 20px 250px 330px 60px",
    gap: "50px",
    padding: "30px 50px 30px 50px"
}

const centerPage = {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center"
}

const premadeEventsStyle = {
    gridRow: "1 / 2",
    gridColumn: "1 / 2",
    fontSize: "30px",
    fontFamily: "Oswald, sans-serif",
    textAlign: "center"
}

const newEventsTextStyle = {
    gridRow: "1 / 2",
    gridColumn: "3 / 4",
    fontSize: "30px",
    fontFamily: "Oswald, sans-serif",
    textAlign: "center"
}

const explanationStyle = {
    gridRow: "1 / 3",
    gridColumn: "2 / 3",
    display: "grid",
    gridTemplateColumns: "500px",
    gridTemplateRows: " 30px 40px 20px 30px 30px",
    paddingTop: "25px"
}

const firstRowStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Oswald, sans-serif",
    fontSize: "23px",
    gridColumn: "1 / 2",
    gridRow: "1 / 2"
}

const secondRowStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Oswald, sans-serif",
    fontSize: "23px",
    gridColumn: "1/2",
    gridRow: "2 / 3"
}

const sixthRowStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Oswald, sans-serif",
    fontSize: "23px",
    gridColumn: "1/2",
    gridRow: "6 / 7",
    paddingTop: "85px",
    lineHeight: "130%"
}

const fifthRowStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Oswald, sans-serif",
    fontSize: "23px",
    gridColumn: "1/2",
    gridRow: "4 / 5",
    paddingTop: "80px"
}

const rightArrowTriangle = {
    border: "solid grey",
    borderWidth: "0 5px 5px 0",
    display: "inline-block",
    transform: "rotate(-45deg)",
    WebkitTransform: "rotate(-45deg)",
    height: "30px",
    width: "30px",
    marginTop: "10px"
}

const arrowLine = {
    width: "92%",
    borderBottom: "3px solid grey",
    display: "inline-block",
    marginBottom: "14px"
}

const arrowStyle = {
    display: "block",
    gridColumn: "1/2",
    gridRow: "3 / 4"
}

const arrowDownStyle = {
    gridColumn: "1 / 2",
    gridRow: "7 / 8",
    placeSelf: "center",
    border: "solid grey",
    borderWidth: "0 5px 5px 0",
    display: "inline-block",
    transform: "rotate(45deg)",
    WebkitTransform: "rotate(45deg)",
    height: "30px",
    width: "30px"
}

const finishButtonStyle = {
    width: "220px",
    height: "60px",
    backgroundColor: "#5DA399",
    borderColor: "#5DA399"
}

const finishButtonPos = {
    gridRow: "4 / 5",
    gridColumn: "2 / 3",
    placeSelf: "end"
}

const finishLevelTextStyle = {
    gridRow: "4 / 5",
    gridColumn: "2 / 3",
    placeSelf: "start",
    fontFamily: "Oswald, sans-serif",
    fontSize: "22px",
    width: "270px",
    lineHeight: "120%"
}

const leftArrowTriangle = {
    border: "solid grey",
    borderWidth: "0 5px 5px 0",
    display: "inline-block",
    transform: "rotate(135deg)",
    WebkitTransform: "rotate(135deg)",
    height: "30px",
    width: "30px",
    marginTop: "10px"
}

const arrowLine2 = {
    width: "20%",
    borderBottom: "3px solid grey",
    display: "inline-block",
    marginBottom: "14px"
}

const arrowStyle2 = {
    display: "block",
    gridColumn: "1/2",
    gridRow: "5 / 6",
    textAlign: "right",
    paddingTop: "49px"
}