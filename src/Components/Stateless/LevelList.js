import LevelCard from './LevelCard'

export default LevelList;

function LevelList({ levels }) {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={wrapper}>
                {levels.map((level, i) => (
                    <div key={'level-' + i} style={{ padding: "8px" }}>
                        <LevelCard {...level} />
                    </div>
                ))}
            </div>
        </div>
    );
}

const wrapper = {
    position: "absolute",
    display: "flex",
    flexWrap: "wrap",
    padding: "10px",
    justifyContent: "center",
    top: "25%",
    paddingTop: "20px",
    width: "73%",
    backgroundColor: "#E4D1C8"
}