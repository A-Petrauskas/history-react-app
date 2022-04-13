import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import EventCardSmall from "../Components/EventCardSmall";
import NavigationButton from "../Components/NavigationButton";
import { Button } from 'react-bootstrap';


export default LevelView

function LevelView() {
    const levelId = useParams();
    const location = useLocation();
    const [level, setLevel] = useState();

    function secondsToMinutes(time) {
        let minutes = Math.floor(time / 60);
        let seconds = time - minutes * 60;

        let finalTime = prettyTime(minutes, '0', 2) + ':' + prettyTime(seconds, '0', 2);

        return finalTime;
    }

    function prettyTime(string, pad, length) {
        return (new Array(length + 1).join(pad) + string).slice(-length);
    }

    useEffect(() => {
        if (!location.state) {
            fetch(`http://localhost:5000/history/levels/id/${levelId.id}`)
                .then(response => response.json())
                .then(level => setLevel(level))
        }
        else {
            setLevel(location.state);
        }

    }, [location, levelId.id]);


    function setMistakes(mistakes) {
        if (mistakes === 0) {
            return "✖";
        }

        return "✖ \t".repeat(mistakes);
    }


    return (
        <div>
            <div style={{
                position: "fixed", top: "1%",
                left: "1%",
            }}>
                <NavigationButton destination={"Menu"} />
            </div>

            <div style={levelInfoStyle}>
                <div style={levelTitle}>
                    {level?.name}
                </div>

                <div style={levelDescription}>
                    {level?.description}
                </div>

                <div style={levelMistakesTime}>
                    <div style={mistakesStyle}>
                        {level && setMistakes(level.mistakes)}
                    </div>
                    {secondsToMinutes(level?.timeConstraint)}
                    <div style={timeStyle}>

                    </div>
                </div>

                <div style={playButtonPosStyle}>
                    <Link to={`/level/${levelId.id}/play`}>
                        <Button variant="outline-secondary" style={playButtonStyle}>PLAY</Button>{''}
                    </Link>
                </div>
            </div>

            <div style={eventListStyle}>
                {level?.events?.map((event, i) => (
                    <div key={'mistakeEvent-' + i}>
                        <EventCardSmall {...event} />
                    </div>
                ))}
            </div>
        </div>
    )
}


const eventListStyle = {
    maxWidth: "800px",
    minWidth: "550px",
    backgroundColor: "#EDC7B7",
    position: "absolute",
    right: "12%",
    marginTop: "20px"
}

const levelTitle = {
    textAlign: "center",
    fontSize: "42px",
    gridColumn: "1 / 3",
    gridRow: "1 / 2",
    justifySelf: "center",
    maxWidth: "70%"
}

const levelDescription = {
    textAlign: "center",
    fontSize: "25px",
    gridColumn: "1 / 3",
    gridRow: "2 / 3",
    justifySelf: "center",
    maxWidth: "85%"
}

const levelMistakesTime = {
    gridColumn: "1 / 3",
    gridRow: "3 / 4",
    justifySelf: "center",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    fontSize: "28px",
    gap: "200px"
}

const levelInfoStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "60px 100px 50px 100px",
    position: "fixed",
    rowGap: "50px",
    top: "12%",
    width: "55%",
    fontFamily: "Oswald, sans-serif"
}

const mistakesStyle = {
    gridColumn: "1 / 2",
}

const timeStyle = {
    gridColumn: "2 / 3",
}

const playButtonStyle = {
    width: "200px",
    height: "80px",
    color: "black",
    fontSize: "20px",
    boxShadow: "0px 15px 20px rgba(0, 0, 0, 0.2)"
}

const playButtonPosStyle = {
    gridColumn: "1 / 3",
    gridRow: "4 / 5",
    justifySelf: "center",
    marginTop: "20px"
}