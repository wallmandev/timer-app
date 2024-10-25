import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Settimer from './components/settimer';
import Digitaltimer from './components/Digitaltimer';
import { TimerProvider } from './components/Timercontext';
import Analogtimer from './components/Analogtimer';
import Alarmview from './components/Alarmview';
import Startview from './components/Startview';
import Texttimer from './components/Texttimer';

const App = () => {
    return (

        <TimerProvider >
        <Router>
            <Routes>

                <Route path="/" element={<Startview />} />
                <Route path="/settimer" element={<Settimer />} />
                <Route path="/digitaltimer" element={<Digitaltimer />} />
                <Route path="/analogtimer" element={<Analogtimer />} />
                <Route path="/alarmview" element={<Alarmview />} />
                <Route path="/texttimer" element={<Texttimer />} />                
            </Routes>
        </Router>
        </TimerProvider>
    );
};

export default App;

