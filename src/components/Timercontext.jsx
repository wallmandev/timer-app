import React, { createContext, useState, useContext } from 'react';

// Skapa en Context för timern
const TimerContext = createContext();

// En hook för att använda TimerContext enkelt
export const useTimerContext = () => useContext(TimerContext);

// Provider-komponenten som omger appen och tillhandahåller timerdata
export const TimerProvider = ({ children }) => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    // Funktion för att uppdatera den återstående tiden
    const updateTime = (newMinutes, newSeconds) => {
        setMinutes(newMinutes);
        setSeconds(newSeconds);
    };

    return (
        <TimerContext.Provider value={{ minutes, seconds, updateTime }}>
            {children}
        </TimerContext.Provider>
    );
};

export default TimerContext;