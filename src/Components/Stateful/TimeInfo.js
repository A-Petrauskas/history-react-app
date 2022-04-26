import { useState, useEffect, useRef } from "react"

export default TimeInfo

function TimeInfo({ time, passTimeIsUp, gameOver }) {
    const timeSet = useRef(true);
    const timeIsUp = useRef(false);
    const [timerDone, SetTimerDone] = useState(false);
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
            if (gameOver) {
                SetTimerDone(true);
                return;
            }
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval);
                    SetTimerDone(true);
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

    if (timerDone) {
        timeIsUp.current = true;
    }

    useEffect(() => {
        if (timeIsUp.current) {
            passTimeIsUp(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeIsUp.current]);

    return (
        <div style={timeStyle}>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
    )
}

const timeStyle = {
    textShadow: "2px 2px 1px grey",
    fontSize: "40px",
    fontFamily: "Oswald, sans-serif",
    marginTop: "30px",
    textAlign: "center"
}