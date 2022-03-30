import React, { useEffect, useState } from 'react';
import EventCardSmall from './EventCardSmall';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default GameOverWindow;

function GameOverWindow({ gameId, gameStatus, score, levelId }) {
    const [stats, setStats] = useState();

    useEffect(() => {
        fetchStats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function fetchStats() {
        return fetch(`http://localhost:5000/history/game/${gameId}/gameover`)
            .then(response => response.json())
            .then(stats => {
                setStats(stats);
            })

    }
    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <div style={dimBackground}>
            <div className='row' style={boxStyle}>

                {gameStatus === 2 &&
                    <b style={borderLine}>GAME OVER</b>
                }

                {gameStatus === 1 &&
                    <b style={borderLine}>YOU HAVE WON!</b>
                }

                <div>
                    <b style={borderLine}> Your score was: {score}</b>
                </div>
                {
                    stats?.mistakes !== 0 &&
                    <div style={{ marginTop: "40px" }}>
                        <b> You made {stats?.mistakes} mistakes when placing these events:</b>

                        {stats?.mistakenEvents?.map((event, i) => (
                            <div key={'mistakeEvent-' + i}>
                                <EventCardSmall {...event} />
                            </div>
                        ))}
                    </div>
                }


                <Button variant="primary" style={{ width: "33%", height: "50px" }}>View Level</Button>{''}
                <Button variant="success" style={{ width: "33%", height: "50px", right: "0", bottom: "0", position: "absolute" }} onClick={() => refreshPage()}>Play Again</Button>{''}

            </div>
        </div>

    )
}

const dimBackground = {
    background: "rgba(0, 0, 0, 0.8)",
    width: "100%",
    height: "100%",
    zIndex: "1000",
    position: "absolute",
    padding: "8px"
}

const boxStyle = {
    display: "flex",
    flexWrap: "wrap",
    position: "absolute",
    top: "20%",
    left: "30%",
    margin: "-25px 0 0 -25px",
    textAlign: "center",
    color: "black",
    fontSize: "large",
    background: "#EDC7B7",
}

const borderLine = {
    borderBottom: "1px solid black",
    margin: "10px 0px",
    display: "inline-block"
}