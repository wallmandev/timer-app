import React, { useEffect, useState } from 'react';
import './Texttimer.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import useTimer from 'easytimer-react-hook';
import MenuOverlay from './MenuOverlay'; // Importera menyn som komponent

// Funktion för att konvertera siffror till text (upp till 59)
const numberToText = (num) => {
    const numbers = [
        "noll", "ett", "två", "tre", "fyra", "fem", "sex", "sju", "åtta", "nio", "tio",
        "elva", "tolv", "tretton", "fjorton", "femton", "sexton", "sjutton", "arton", "nitton",
        "tjugo", "tjugoett", "tjugotvå", "tjugotre", "tjugofyra", "tjugofem", "tjugosex", "tjugosju",
        "tjugoåtta", "tjugonio", "trettio", "trettioett", "trettiotvå", "trettiotre", "trettiofyra",
        "trettiofem", "trettiosex", "trettiosju", "trettioåtta", "trettionio", "fyrtio", "fyrtioett",
        "fyrtiotvå", "fyrtiotre", "fyrtiofyra", "fyrtiofem", "fyrtiosex", "fyrtiosju", "fyrtioåtta",
        "fyrtionio", "femtio", "femtionio"
    ];
    return numbers[num]?.toUpperCase() || "NOLL";
};

const Texttimer = () => {
    const location = useLocation(); // Hämta minuter och sekunder från Settimer
    const navigate = useNavigate();

    const { minutes, seconds } = location.state || { minutes: 1, seconds: 0 }; // Default till 0 om inget skickas

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
        <div className="texttimer">
            <div className="texttimer-inner">
                <button className="texttimer-menu" onClick={toggleOverlay}>
                    <img className="texttimer-menu__item" src="src/assets/Images/navicon.svg" alt="Menu icon" />
                </button>

                {/* Visa menyn med den aktuella tiden */}
                <MenuOverlay 
                    isVisible={isOverlayVisible} 
                    toggleOverlay={toggleOverlay} 
                    currentMinutes={timer.getTimeValues().minutes} 
                    currentSeconds={timer.getTimeValues().seconds} 
                />

                <h1 className="texttimer-logo">Interval</h1>
                <h2 className="texttimer-timer">
                    {numberToText(timer.getTimeValues().minutes)} minuter och {numberToText(timer.getTimeValues().seconds)} sekunder kvar
                </h2>
                <button onClick={handleAbort} className="texttimer-button">AVBRYT TIMER</button>
            </div>
        </div>
    );
};

export default Texttimer;