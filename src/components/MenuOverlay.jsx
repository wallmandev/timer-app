import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // För att navigera med state
import './MenuOverlay.scss';

const MenuOverlay = ({ isVisible, toggleOverlay, currentMinutes, currentSeconds }) => {
    const navigate = useNavigate(); // För att skicka state vid navigation

    const itemVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1, // Fördröjning mellan varje barnanimation
                delayChildren: 0.2, // Fördröjning för att vänta tills overlay expanderar
            },
        },
        exit: {
            transition: {
                staggerChildren: 0.1,
                staggerDirection: -1, // Reversera animationen vid borttagning
            },
        },
    };

    const handleNavigation = (timerType) => {
        // Skickar currentMinutes och currentSeconds till nästa komponent via state
        navigate(`/${timerType}`, {
            state: {
                minutes: currentMinutes,
                seconds: currentSeconds,
            },
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="menu-overlay"
                    initial={{ width: 0 }}
                    animate={{ width: 450 }} // Expandera till 450px
                    exit={{ width: 0 }} // Krymp till 0 när menyn stängs
                    transition={{ duration: 0.5, ease: "easeInOut" }} // Lägg till fördröjning för overlay
                >
                    <div className="menu-overlay__inner">
                        <button className="menu-overlay__close" onClick={toggleOverlay}>X</button>
                        <motion.ul
                            className="menu-overlay__list"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={containerVariants} // Använd variant för container med delayChildren
                        >
                            <motion.li
                                className="menu-overlay__list-item"
                                variants={itemVariants} // Använd variant för varje menyobjekt
                                transition={{ duration: 0.3 }}
                                onClick={() => handleNavigation('digitaltimer')} // Skickar state till Digital Timer
                            >
                                <a className="menu-overlay__list-link">Digital Timer</a>
                            </motion.li>
                            <motion.li
                                className="menu-overlay__list-item"
                                variants={itemVariants}
                                transition={{ duration: 0.3 }}
                                onClick={() => handleNavigation('analogtimer')} // Skickar state till Analog Timer
                            >
                                <a className="menu-overlay__list-link">Analog Timer</a>
                            </motion.li>
                        </motion.ul>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MenuOverlay;