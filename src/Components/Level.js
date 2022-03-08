export default Level;

function Level({ name, numberOfEvents, mistakes, timeConstraint }) {
    return (
        <div style={rectangle}>
            <h3>{name}</h3>
            <h4 style={details}>Events in level: {numberOfEvents}</h4>
            <h4 style={details}>Allowed mistakes: {mistakes}</h4>
            <h4 style={details}>Time constraint: {timeConstraint}</h4>
        </div>
    )
}

const rectangle = {
    border: "gray solid 2px",
    borderRadius: "25px",
    margin: "10px",
    padding: "20px",
    width: "250px",
    backgroundColor: "#FEF2D7"
}

const details = {
    borderTop: "gray solid 1px",
    margin: "20px 0",
    paddingTop: "10px"
}