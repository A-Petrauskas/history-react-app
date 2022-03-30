import { useRef } from "react"

export default LivesAndTime

function LivesAndTime({ mistakesAllowed, mistakes, time }) {
    const lives = useRef("");
    const heartsInitialised = useRef(true);

    function getLives() {
        if (mistakes === 0 && heartsInitialised.current) {
            heartsInitialised.current = false;
            lives.current = "❤".repeat(mistakesAllowed);
            return lives.current;
        }
        else if (mistakes === 0) {
            return lives.current = "❤";
        }

        let newLives = setCharAt(lives.current, mistakes - 1, "✖");
        lives.current = newLives;

        return newLives;
    }

    function setCharAt(string, index, char) {
        let newString = string.substring(0, index) + char + string.substring(index + 1)

        return newString;
    }

    return (
        <div style={livesTimePos}>
            <div style={livesStyle}>
                {mistakesAllowed !== -1 && getLives()}
            </div>

            <div style={timeStyle}>
                time:
            </div>
        </div>
    )
}

const livesTimePos = {
    position: "absolute",
    top: "8%",
    right: "8%"
}

const livesStyle = {
    fontSize: "40px"
}

const timeStyle = {
    fontSize: "40px"
}