import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settimer.scss';

const Settimer = () => {
    const [minutes, setMinutes] = useState(1); // Inställning för minuter
    const [seconds, setSeconds] = useState(0);  // Inställning för sekunder
    const navigate = useNavigate(); // Använd useNavigate för att navigera mellan sidor

    // Starta timern och navigera till Digitaltimer
    const startDigital = () => {
        navigate('/digitaltimer', { state: { minutes, seconds } }); // Navigera och skicka minuter och sekunder
    };

    const startAnalog = () => {
        navigate('/analogtimer', { state: { minutes, seconds } }); // Navigera och skicka minuter och sekunder
    };

    const stopTimer = () => {
        timer.pause(); 
        setIsRunning(false);
    };

    const increaseMinutes = () => setMinutes(prev => prev + 1);
    const decreaseMinutes = () => setMinutes(prev => (prev > 1 ? prev - 1 : 1));

    return (
        <div className="settimer">
            <div className="settimer-inner">

                <h2>Set timer</h2>

                <div className="settimer-buttons">
                    <h2 className="settimer-buttons__container">
                        <button onClick={decreaseMinutes} className="settimer-buttons__item">←</button>
                        {minutes}
                        <button onClick={increaseMinutes} className="settimer-buttons__item">→</button>
                    </h2>
                </div>

                {/* Starta och skicka minuter och sekunder */}
                <button className="settimer-buttons__digital" onClick={startDigital}>Digital Timer</button>
                <button className="settimer-buttons__analog" onClick={startAnalog}>Analog Timer</button>
            </div>
        </div>
    );
};

export default Settimer;