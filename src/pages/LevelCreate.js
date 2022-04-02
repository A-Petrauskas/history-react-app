import NewEventForm from "../Components/NewEventForm";

export default LevelCreate;

function LevelCreate() {
    return (
        <div>
            <div>
                Suggested events
            </div>

            <div>
                <NewEventForm />
            </div>

            <div>
                Small event cards for events added to level
            </div>
        </div>
    )
}