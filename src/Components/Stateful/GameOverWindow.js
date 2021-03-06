import React, { useEffect, useState } from 'react';
import EventCardSmall from '../Stateless/EventCardSmall';
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
        return fetch(`http://localhost:5000/game/${gameId}/gameover`)
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
                    <b style={borderLine}> <div style={{ fontSize: "30px" }}>GAME OVER</div></b>
                }

                {gameStatus === 1 &&
                    <b style={borderLine}> <div style={{ fontSize: "30px" }}>YOU HAVE WON!</div></b>
                }

                <div>
                    <b style={borderLine}> <div style={{ fontSize: "20px" }}>Your score was: </div><div style={{ fontSize: "30px", backgroundColor: "#E7B39D" }}>{score}</div></b>
                </div>
                {
                    stats?.mistakes !== 0 &&
                    <div style={{ marginTop: "40px" }}>
                        {stats?.mistakes > 1 &&
                            <b> You made {stats?.mistakes} mistakes when placing these events:</b>
                        }

                        {stats?.mistakes === 1 &&
                            <b> You made {stats?.mistakes} mistake when placing this event:</b>
                        }

                        {stats?.mistakenEvents?.map((event, i) => (
                            <div key={'mistakeEvent-' + i} style={{ marginLeft: "20px", marginRight: "20px" }}>
                                <EventCardSmall {...event} />
                            </div>
                        ))}
                    </div>
                }

                <div style={buttonsStyle}>
                    <Link to={`/level/${levelId}/view`}>
                        <Button variant="primary" style={viewButtonStyle}>View Level</Button>{''}
                    </Link>

                    <Button variant="success" style={playButtonStyle} onClick={() => refreshPage()}>Play Again</Button>{''}
                </div>
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
    padding: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

const boxStyle = {
    display: "flex",
    flexWrap: "wrap",
    position: "absolute",
    margin: "-25px 0 0 -25px",
    textAlign: "center",
    color: "black",
    fontSize: "large",
    background: "#EDC7B7",
    maxWidth: "830px"
}

const borderLine = {
    borderBottom: "1px solid black",
    margin: "10px 0px",
    display: "inline-block"
}

const playButtonStyle = {
    gridColumn: "3 / 4",
    gridRow: "1 / 2",
    width: "150px",
    height: "38px",
    justifySelf: "center",
    backgroundColor: "#5DA399",
    borderColor: "#5DA399"
}

const viewButtonStyle = {
    gridColumn: "1 / 2",
    gridRow: "1 / 2",
    width: "150px",
    height: "38px",
    justifySelf: "center",
    backgroundColor: "#8C92BA",
    borderColor: "#B3B7D1"
}

const buttonsStyle = {
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateRows: "55px",
    width: "100%",
    backgroundColor: "#E7B39D",
    paddingTop: "20px"
}