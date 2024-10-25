import React from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from 'react-router-dom';
import './Alarmview.scss'

const Alarmview = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const newTimer = () => {
        navigate('/settimer')
    };

    return(
        <>
            <div className="alarmview">
                <div className="alarmview-bell">

                    <div className="bell-background-container">
                        {/* Expanderande cirklar */}
                        <motion.div
                            className="circle"
                            animate={{ scale: [0.5, 1.5, 2] }} // Cirkeln expanderar
                            transition={{
                                repeat: Infinity, // Oändlig loop
                                duration: 2, // Hur lång tid varje expansion tar
                                ease: "easeInOut",
                            }}
                        />
                        <motion.div
                            className="circle"
                            animate={{ scale: [0.5, 1.5, 2] }} // Flera cirklar kan ha olika effekter
                            transition={{
                                repeat: Infinity, // Oändlig loop
                                duration: 2.5, // Olika tid för att skapa variation
                                ease: "easeInOut",
                            }}
                        />
                        <motion.div
                            className="circle"
                            animate={{ scale: [0.5, 1.5, 2] }} // Fler cirklar med olika timings
                            transition={{
                                repeat: Infinity,
                                duration: 3,
                                ease: "easeInOut",
                            }}
                        />
                        {/* Animerad ringklocka med <img> */}
                        <motion.img
                            src="src/assets/Images/alarm icon.svg" // Byt ut mot din bild
                            alt="Bell"
                            className="alarmview-bellimage"
                            animate={{
                                rotate: [-30, 30, -30], // Keyframes för att animera rotation mellan -30 och 30 grader
                            }}
                            transition={{
                                repeat: Infinity, // Låt animationen loopa oändligt
                                duration: 1, // Tiden för att gå från -30 till 30 grader
                                ease: "easeInOut", // Mjuk in- och utgång
                            }}
                        />
                    </div>

                    <h2 className="alarmview-content">Times up!</h2>

                </div>

                <button onClick={() => navigate('/settimer')} className="alarmview-button">Set New Timer</button>

            </div>
        </>
    )

}

export default Alarmview;