import { useEffect, useState } from "react"

export default LivesInfo

function LivesInfo({ mistakesAllowed, mistakes }) {
    const [lives, setLives] = useState("");

    useEffect(() => {
        if (mistakesAllowed === 0 && mistakes === 0) {
            setLives("❤");
        }
        else if (mistakes === 0) {
            setLives("❤".repeat(mistakesAllowed));
        }
        else {
            let newLives = setCharAt(lives, mistakes - 1, "✖");
            setLives(newLives);
        }
    }, [mistakesAllowed, mistakes, lives]);

    function setCharAt(string, index, char) {
        let newString = string.substring(0, index) + char + string.substring(index + 1)

        return newString;
    }

    return (
        <div style={livesStyle}>
            {lives}
        </div>
    )
}

const livesStyle = {
    fontSize: "50px",
    textAlign: "center"
}