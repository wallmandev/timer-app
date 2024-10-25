import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // För navigation
import './Startview.scss'

const Startview = () => {
    const navigate = useNavigate(); // Använd useNavigate för att navigera

    // Hantera klick på loggan
    const handleLogoClick = () => {
        navigate('/Settimer'); // Navigera till Settimer
    };

    return (
        <>
            <div className="startview">
                <div className="startview-inner">
                    <motion.img
                        src="src/assets/Images/logo.svg"
                        alt="Logo"
                        className="startview-logo"
                        initial={{ opacity: 0, scale: 0.5 }} // Start med låg opacitet och liten storlek
                        animate={{ opacity: 1, scale: 1.0 }} // Animering till full synlighet och storlek
                        transition={{ duration: 2, ease: "easeInOut" }} // Smidig in- och utgång över 2 sekunder
                        onClick={handleLogoClick} // När man klickar på loggan
                        style={{ cursor: "pointer" }} // Ändra muspekaren till hand vid hover
                    />
                    <motion.div
                        className="startview-text"
                        initial={{ opacity: 0, scale: 0.5 }} // Start med låg opacitet och liten storlek
                        animate={{ opacity: 1, scale: 1.0 }} // Animering till full synlighet och storlek
                        transition={{ duration: 2, ease: "easeInOut" }} // Smidig in- och utgång över 2 sekunder
                        onClick={handleLogoClick} // När man klickar på loggan
                        style={{ cursor: "pointer" }} // Ändra muspekaren till hand vid hover
                    >
                        <h2 className="startview-text">For all your timing needs</h2>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default Startview;
