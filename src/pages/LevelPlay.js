import React, { useEffect, useState, useRef } from 'react';
import { useParams } from "react-router-dom";
import EventList from "../Components/Stateless/EventList"
import EventCard from "../Components/Stateless/EventCard";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import GameOverWindow from "../Components/Stateful/GameOverWindow";
import LivesInfo from '../Components/Stateful/LivesInfo';
import ScoreInfo from '../Components/Stateless/ScoreInfo';
import TimeInfo from '../Components/Stateful/TimeInfo';
import NavigationButton from '../Components/Stateless/NavigationButton';


export default LevelPlay;

function LevelPlay() {
    const levelId = useParams();
    const baseEvent = useRef(true);
    const placementIndex = useRef(-1);
    const mistakes = useRef(0);
    const mistakeMade = useRef(false);
    const gameOver = useRef(false);
    const gameStatus = useRef(0);
    const score = useRef(0);
    const timeConstraint = useRef(-1);
    const mistakesAllowed = useRef(-1);
    const timeOutSent = useRef(false);
    const [timeIsUp, SetTimeIsUp] = useState(false);
    const [firstEvent, setFirstEvent] = useState(false);
    const [gameId, setGameId] = useState("");
    const [event, setEvent] = useState();
    const [placedEvents, setPlacedEvents] = useState([]);


    useEffect(() => {
        fetch("http://localhost:5000/game", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ levelId: levelId.id })
        })
            .then(response => response.json())
            .then(data => {
                setGameId(data.gameId);
                timeConstraint.current = data.timeConstraint;
                mistakesAllowed.current = data.mistakesAllowed;
            });
    }, [levelId]);


    function fetchNextEvent(pIndex) {
        return fetch(`http://localhost:5000/game/${gameId}/guess`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ placementIndex: pIndex })
        })
            .then(response => response.json())
            .then(data => {
                if (baseEvent.current) {
                    setPlacedEvents([data]);
                    baseEvent.current = false;
                    setFirstEvent(true);
                    return;
                }

                if (data.mistakes !== mistakes.current) {
                    mistakeMade.current = true;
                    mistakes.current = data.mistakes;
                }

                if (data.gameStatus !== 0) {
                    gameOver.current = true;
                    gameStatus.current = data.gameStatus;
                }

                setEvent(data);
            })
    }

    useEffect(() => {
        if (gameId !== "") {
            fetchNextEvent(placementIndex.current);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameId, firstEvent]);


    if (timeIsUp && !timeOutSent.current) {
        timeOutSent.current = true;
        fetchNextEvent(-1);
    }


    let onDragEnd = result => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        placementIndex.current = destination.index;

        fetchNextEvent(placementIndex.current).then(() => {
            if (mistakeMade.current) {
                mistakeMade.current = false;
                return;
            }
            else {
                score.current++;
                const finish = placedEvents.slice();
                finish.splice(destination.index, 0, event);
                setPlacedEvents(finish);
            }
        });

    }

    return (
        <div>
            <div style={navButtonStyle}>
                <NavigationButton destination={"Menu"} gameOver={gameOver.current} />
            </div>

            {gameOver.current &&
                <GameOverWindow gameId={gameId} gameStatus={gameStatus.current} score={score.current} levelId={levelId.id} />
            }

            <ScoreInfo currentScore={score.current} />

            <div style={livesAndTimeStyle}>
                {mistakesAllowed.current !== -1 &&
                    <LivesInfo mistakesAllowed={mistakesAllowed.current} mistakes={mistakes.current} />
                }

                {timeConstraint.current !== -1 &&
                    <TimeInfo time={timeConstraint.current} passTimeIsUp={SetTimeIsUp} gameOver={gameOver.current} />
                }
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div style={textStyle}>
                    <Droppable droppableId="newEvent" isDropDisabled={true} direction="horizontal">
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}
                                style={newEventStyle}>
                                {!gameOver.current &&
                                    <EventCard {...event} id={'newCard'} index={0} dragDisabled={false} />
                                }
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    {placedEvents.length > 0 &&
                        <EventList placedEvents={placedEvents} direction="horizontal" dragDisabled={true} />
                    }
                </div>
            </DragDropContext>
        </div>
    )
}

const textStyle = {
    textAlign: "center",
    position: "relative"
}

const newEventStyle = {
    display: "flex",
    justifyContent: "center",
    padding: "50px",
}

const livesAndTimeStyle = {
    verticalAlign: "middle",
    position: "absolute",
    top: "10%",
    right: "10%",
    minWidth: "120px"
}

const navButtonStyle = {
    zIndex: "10001",
    width: "160px",
    height: "95px",
    position: "absolute",
    top: "1%",
    left: "1%"
}