import React, { useEffect, useState } from "react";
import LevelCard from './LevelCard'

export default LevelList;

function LevelList() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [levels, setEvents] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/history/levels")
            .then(response => response.json())
            .then(events => {
                setEvents(events);
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
            <>
                <div style={wrapper}>
                    {levels.map((level, i) => (
                        <div key={'level-' + i}>
                            <LevelCard {...level} />
                        </div>
                    ))}
                </div>
            </>
        );
    }
}

const wrapper = {
    display: "flex",
    flexWrap: "wrap",
    padding: "10px",
    justifyContent: "center",
    paddingTop: "100px"
}