import React, { useEffect, useState } from "react";
import LevelCard from '../Stateless/LevelCard'

export default LevelList;

function LevelList() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [levels, setLevels] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/levels")
            .then(response => response.json())
            .then(levels => {
                setLevels(levels);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
            })

    }, []);


    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (isLoading) {
        return <div>Loading...</div>;
    } else {
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