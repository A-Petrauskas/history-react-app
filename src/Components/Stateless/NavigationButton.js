import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default NavigationButton

function NavigationButton({ destination, gameOver, tutorialDone }) {
    var page = null;

    if (destination === "Menu") {
        page = `/`
    }
    else {
        page = `/create`
    }

    if (gameOver || !tutorialDone) {
        return (
            <Link to={page}>
                <Button variant="outline-secondary" style={navButtonGameOverStyle}>{destination}</Button>{' '}
            </Link>
        )
    }

    return (
        <Link to={page}>
            <Button variant="outline-secondary" style={navButtonStyle}>{destination}</Button>{' '}
        </Link>
    )
}


const navButtonStyle = {
    position: "absolute",
    top: "1%",
    left: "1%",
    width: "150px",
    height: "85px",
    fontSize: "30px",
    boxShadow: "0px 15px 20px rgba(0, 0, 0, 0.2)",
    zIndex: "10002",
    fontFamily: "Oswald, sans-serif",
    color: "#303030"
}

const navButtonGameOverStyle = {
    position: "absolute",
    top: "1%",
    left: "1%",
    width: "150px",
    height: "85px",
    fontSize: "30px",
    boxShadow: "0px 15px 20px rgba(0, 0, 0, 0.2)",
    zIndex: "10002",
    background: "#EEE2DC",
    color: "#303030",
    fontFamily: "Oswald, sans-serif"
}