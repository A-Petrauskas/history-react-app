import { useEffect, useState } from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

export default DateTypeButton;

function DateTypeButton({ setFullDates, eventAdded }) {
    const [radioValue, setRadioValue] = useState('1');

    useEffect(() => {
        if (radioValue === '1') {
            setFullDates(false);
        }
        else {
            setFullDates(true);
        }

    }, [radioValue, setFullDates])

    const radios = [
        { name: 'Years Only', value: '1' },
        { name: 'Full Dates', value: '2' }
    ];

    return (
        <div style={{ marginBottom: "10px" }}>
            <ButtonGroup>
                {radios.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant={idx % 2 ? 'outline-secondary' : 'outline-secondary'}
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                        disabled={eventAdded}
                    >
                        {radio.name}
                    </ToggleButton>
                ))}
            </ButtonGroup>
        </div>
    );
}