import { useState, useEffect, useRef } from "react"

export default TimeInfo

function TimeInfo({ time, passTimeIsUp }) {
    const timeSet = useRef(true);
    const timeIsUp = useRef(false);
    const [seconds, setSeconds] = useState(time);
    const [minutes, setMinutes] = useState(time);

    if (timeSet.current) {
        timeSet.current = false;

        let minutes = Math.floor(time / 60);
        let seconds = time - minutes * 60;

        setMinutes(minutes);
        setSeconds(seconds);
    }

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });

    if (seconds === 0 && minutes === 0) {
        timeIsUp.current = true;
    }

    useEffect(() => {
        if (timeIsUp.current) {
            passTimeIsUp(true);
        }
    }, [timeIsUp.current])

    return (
        <div style={timeStyle}>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
    )
}

const timeStyle = {
    textShadow: "2px 2px 1px grey",
    fontSize: "50px",
    fontFamily: "Oswald, sans-serif",
    marginTop: "30px",
    textAlign: "center"
}