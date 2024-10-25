import React, { useEffect, useState } from 'react';
import './Digitaltimer.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import useTimer from 'easytimer-react-hook';
import MenuOverlay from './MenuOverlay'; // Importera menyn som komponent

const Digitaltimer = () => {
    const location = useLocation(); // Hämta minuter och sekunder från Settimer
    const navigate = useNavigate();

    const { minutes, seconds } = location.state || { minutes: 0, seconds: 0 }; // Default till 0 om inget skickas

    const [isOverlayVisible, setOverlayVisible] = useState(false); // Hantera menyvisning

    // Skapa en timer med startvärdena som skickas från Settimer
    const [timer, isTargetAchieved] = useTimer({
        countdown: true, // Gör det till en nedräkning
        startValues: { minutes, seconds }, // Starta timern med skickade minuter och sekunder
        precision: 'seconds',
        updateWhenTargetAchieved: true, // Uppdatera när målet nås
    });

    useEffect(() => {
        // Starta timern när komponenten laddas
        timer.start({
            startValues: { minutes, seconds },
        });
    }, [minutes, seconds, timer]);

    useEffect(() => {
        if (isTargetAchieved) {
            navigate('/Alarmview'); // Navigera när målet är uppnått
        }
    }, [isTargetAchieved, navigate]);

    const handleAbort = () => {
        navigate('/settimer'); // Navigera tillbaka till Settimer när ABORT TIMER trycks
    };

    const toggleOverlay = () => {
        setOverlayVisible(!isOverlayVisible); // Visa eller dölj menyn
    };

    return (
        <div className="digitaltimer">
            <div className="digitaltimer-inner">
                <button className="digitaltimer-menu" onClick={toggleOverlay}>
                    <img className="digitaltimer-menu__item" src="src/assets/Images/navicon.svg" alt="Menu icon" />
                </button>

                {/* Visa menyn med den aktuella tiden */}
                <MenuOverlay 
                    isVisible={isOverlayVisible} 
                    toggleOverlay={toggleOverlay} 
                    currentMinutes={timer.getTimeValues().minutes} 
                    currentSeconds={timer.getTimeValues().seconds} 
                />

                <h1 className="digitaltimer-logo">Interval</h1>
                <h2 className="digitaltimer-timer">
                    {timer.getTimeValues().minutes} : {timer.getTimeValues().seconds}
                </h2>
                <button onClick={handleAbort} className="digitaltimer-button">ABORT TIMER</button>
            </div>
        </div>
    );
};

export default Digitaltimer;