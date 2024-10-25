import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Analogtimer.scss';
import useTimer from 'easytimer-react-hook';
import MenuOverlay from './MenuOverlay';
import Alarmview from './Alarmview';

const Analogtimer = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Hämta kvarvarande minuter och sekunder från Digitaltimer
    const { minutes = 0, seconds = 0 } = location.state || { minutes: 0, seconds: 0 };

    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [minuteRotation, setMinuteRotation] = useState(0);
    const [secondRotation, setSecondRotation] = useState(0);

    const [timer, isTargetAchieved] = useTimer({
        countdown: true,
        startValues: { minutes, seconds },
        precision: 'seconds',
        updateWhenTargetAchieved: true,
    });

    // Synkronisera visarna vid start baserat på exakt återstående tid
    useEffect(() => {
        timer.start(); // Starta timern innan vi hämtar tiden som är kvar

        const timeLeft = timer.getTotalTimeValues().seconds;
        const remainingMinutes = Math.floor(timeLeft / 60);
        const remainingSeconds = timeLeft % 60;

        // Sätt initiala rotationer för minut- och sekundvisarna
        setMinuteRotation((remainingMinutes * 6) + (remainingSeconds / 60) * 6 + 90); // Räkna ner från startvärdet
        setSecondRotation((remainingSeconds * 6) + 90);  // Sekundvisaren ska räkna framåt

    }, []); 

    useEffect(() => {
        // Uppdatera visarnas positioner varje sekund
        const interval = setInterval(() => {
            const timeLeft = timer.getTotalTimeValues().seconds;
            const remainingMinutes = Math.floor(timeLeft / 60);
            const remainingSeconds = timeLeft % 60;

            // Kontinuerlig uppdatering för minutvisaren (motsols)
            setMinuteRotation((remainingMinutes * 6) + (remainingSeconds / 60) * 6 + 90);
            
            // Sekundvisaren (medsols) med exakt position
            const passedSeconds = (minutes * 60 + seconds) - timeLeft;
            setSecondRotation(((passedSeconds % 60) * 6) + 90);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        if (isTargetAchieved) {
            navigate('/Alarmview');
        }
    }, [isTargetAchieved, navigate]);

    const handleAbort = () => {
        timer.stop();
        navigate('/settimer');
    };

    const toggleOverlay = () => {
        setOverlayVisible(!isOverlayVisible);
    };

    const marks = Array.from({ length: 60 }, (_, i) => i);

    return (
        <div className="analogtimer">
            <div className="analogtimer-inner">
                <h1 className="digitaltimer-logo">Interval</h1>
                <button className="analogtimer-menu" onClick={toggleOverlay}>
                    <img className="analogtimer-menu__item" src="src/assets/Images/navicon.svg" alt="Menu icon" />
                </button>
                <MenuOverlay
                    isVisible={isOverlayVisible}
                    toggleOverlay={toggleOverlay}
                    currentMinutes={timer.getTimeValues().minutes}
                    currentSeconds={timer.getTimeValues().seconds}
                />
                <div className="analogtimer-clock">
                    <div className="clock-face">
                        {marks.map((mark, i) => (
                            <div
                                key={i}
                                className="mark"
                                style={{ transform: `rotate(${i * 6}deg) translateY(-140px)` }}
                            />
                        ))}
                        <div
                            className="hand minute-hand"
                            style={{ transform: `rotate(${minuteRotation}deg)` }}
                        />
                        <div
                            className="hand second-hand"
                            style={{ transform: `rotate(${secondRotation}deg)` }}
                        />
                        <div className="center-dot" />
                    </div>
                </div>
                <button className="analogtimer-button" onClick={handleAbort}>ABORT TIMER</button>
                {isTargetAchieved && <Alarmview />}
            </div>
        </div>
    );
};

export default Analogtimer;




// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './Analogtimer.scss';
// import useTimer from 'easytimer-react-hook';
// import { motion, AnimatePresence } from 'framer-motion';
// import Alarmview from './Alarmview';

// const Analogtimer = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { minutes = 0, seconds = 0 } = location.state || { minutes: 0, seconds: 0 };

//     const [isOverlayVisible, setOverlayVisible] = useState(false);

//     const [timer, isTargetAchieved] = useTimer({
//         countdown: true,
//         startValues: { minutes, seconds },
//         precision: 'seconds',
//         updateWhenTargetAchieved: true,
//     });

//     useEffect(() => {
//         timer.start({
//             startValues: { minutes, seconds },
//         });
//     }, [minutes, seconds, timer]);

//     const totalTime = minutes * 60 + seconds;
//     const secondsLeft = timer.getTotalTimeValues().seconds;

//     useEffect(() => {
//         if (isTargetAchieved) {
//             navigate('/Alarmview');
//         }
//     }, [isTargetAchieved, navigate]);

//     const calculateMinuteRotation = (timeLeft) => {
//         const remainingMinutes = Math.floor(timeLeft / 60);
//         const passedSecondsInCurrentMinute = timeLeft % 60;
//         const startRotation = (minutes * 6) + 90;
//         const rotationForMinutes = remainingMinutes * 6;
//         const rotationForSeconds = (passedSecondsInCurrentMinute / 60) * 6;
//         return startRotation - rotationForMinutes - rotationForSeconds;
//     };

//     const calculateSecondRotation = (timeLeft) => {
//         const passedSeconds = totalTime - timeLeft;
//         return ((passedSeconds % 60) * 6) + 90;
//     };

//     const minuteRotation = calculateMinuteRotation(secondsLeft);
//     const secondRotation = calculateSecondRotation(secondsLeft);

//     const marks = Array.from({ length: 60 }, (_, i) => i);

//     const handleAbort = () => {
//         timer.stop();
//         navigate('/settimer');
//     };

//     const toggleOverlay = () => {
//         setOverlayVisible(!isOverlayVisible);
//     };

//     return (
//         <div className="analogtimer">
//             <div className="analogtimer-inner">
//                 <button className="analogtimer-menu" onClick={toggleOverlay}>
//                     <img className="analogtimer-menu__item" src="src/assets/Images/navicon.svg" alt="Menu icon" />
//                 </button>

//                 <AnimatePresence>
//                     {isOverlayVisible && (
//                         <motion.div
//                             className="analogtimer-overlay"
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             exit={{ opacity: 0 }}
//                             transition={{ duration: 0.5 }}
//                         >
//                             <div className="analogtimer-overlay__inner">
//                                 <button className="analogtimer-overlay__close" onClick={toggleOverlay}>X</button>

//                                 {/* Animerad lista med textobjekt */}
//                                 <motion.ul
//                                     className="analogtimer-overlay__list"
//                                     initial="hidden"
//                                     animate="visible"
//                                     exit="hidden"
//                                     variants={{
//                                         visible: {
//                                             transition: { staggerChildren: 0.1, delayChildren: 0.3 }
//                                         },
//                                         hidden: {
//                                             transition: { staggerChildren: 0.05, staggerDirection: -1 }
//                                         }
//                                     }}
//                                 >
//                                     {['Digital Timer', 'Analog Timer', 'Text Timer'].map((item, index) => (
//                                         <motion.li
//                                             key={index}
//                                             className="analogtimer-overlay__list-item"
//                                             variants={{
//                                                 hidden: { opacity: 0, y: -20 },
//                                                 visible: { opacity: 1, y: 0 }
//                                             }}
//                                             transition={{ duration: 0.2 }}
//                                         >
//                                             <a className="analogtimer-overlay__list-link" href={`/${item.replace(" ", "").toLowerCase()}`}>{item}</a>
//                                         </motion.li>
//                                     ))}
//                                 </motion.ul>
//                             </div>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>

//                 {/* Analog klocka och övriga knappar */}
//                 <div className="analogtimer-clock">
//                     <div className="clock-face">
//                         {marks.map((mark, i) => (
//                             <div
//                                 key={i}
//                                 className="mark"
//                                 style={{ transform: `rotate(${i * 6}deg) translateY(-140px)` }}
//                             />
//                         ))}
//                         <div
//                             className="hand minute-hand"
//                             style={{ transform: `rotate(${minuteRotation}deg)` }}
//                         />
//                         <div
//                             className="hand second-hand"
//                             style={{ transform: `rotate(${secondRotation}deg)` }}
//                         />
//                         <div className="center-dot" />
//                     </div>
//                 </div>
//                 <button className="analogtimer-button" onClick={handleAbort}>ABORT TIMER</button>
//                 {isTargetAchieved && <Alarmview />}
//             </div>
//         </div>
//     );
// };

// export default Analogtimer;