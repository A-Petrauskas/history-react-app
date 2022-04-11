import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import EventCardSmall from "../Components/EventCardSmall";


export default LevelView

function LevelView() {
    const levelId = useParams();
    const location = useLocation();
    const [level, setLevel] = useState();

    useEffect(() => {
        if (!location.state) {
            console.log("FROM API")
            fetch(`http://localhost:5000/history/levels/id/${levelId.id}`)
                .then(response => response.json())
                .then(level => setLevel(level))
        }
        else {
            console.log("FROM LOCATION")
            setLevel(location.state);
        }

    }, [location, levelId.id]);


    return (
        <div>
            {level?.events?.map((event, i) => (
                <div key={'mistakeEvent-' + i}>
                    <EventCardSmall {...event} />
                </div>
            ))}
        </div>
    )
}