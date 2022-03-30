import { useRef } from "react"

export default LivesAndTime

function LivesAndTime({ mistakesAllowed, mistakes }) {
    const lives = useRef("");
    const heartsInitialised = useRef(true);

    function getLives() {
        if (mistakesAllowed === 0 && mistakes === 0) {
            return lives.current = "❤";
        }
        else if (mistakes === 0) {
            heartsInitialised.current = false;
            lives.current = "❤".repeat(mistakesAllowed);
            return lives.current;
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
        <div style={livesStyle}>
            {mistakesAllowed !== -1 && getLives()}
        </div>
    )
}

const livesStyle = {
    fontSize: "50px",
    textAlign: "center"
}