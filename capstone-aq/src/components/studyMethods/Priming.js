import React, { useState, useEffect } from 'react';
import '../StudySession.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const Priming = () => {
    const userId = Cookies.get('user_id');

    const { state } = useLocation();
    const navigate = useNavigate();
    const [notes, setNotes] = useState('');
    const [timer, setTimer] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    const studyMethodDetails = {
        "Priming": {
            sessionTime: 2400, // 40 minutes
            description: "Priming involves preparing the brain for learning with a brief preliminary exposure to key concepts."
        }    };

    useEffect(() => {
        const methodDetail = state?.method && studyMethodDetails[state.method];
        if (methodDetail) {
            setTimer(methodDetail.sessionTime);
        } else {
            // Handle the case where method is not found
            setTimer(0); // Set default timer or handle appropriately
        }
    }, [state?.method]);

    useEffect(() => {
        let interval = null;
        if (isTimerRunning && timer > 0) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        } else if (!isTimerRunning) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, timer]);

    const handleEndSession = async () => {
        const currentDateTime = new Date();
        const startTime = new Date(currentDateTime.getTime() - timer * 1000); // Convert seconds to milliseconds
        const sessionData = {
            method: state.method,
            userId: userId, // Replace with the actual user ID
            methodId: 1, // Replace with the selected study method ID
            startTime: startTime.toISOString(), // Convert the date to a valid timestamp with time zone
            endTime: currentDateTime.toISOString(),
            duration: studyMethodDetails[state.method].sessionTime - timer,
            notes: notes,
            feedback: 'User feedback goes here', // You can include user feedback if applicable
        };

        try {
            const response = await fetch('/api/save-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sessionData),
            });

            if (response.status === 201) {
                const result = await response.json();
                // Session saved successfully, you can access the session_id from the response
                console.log('Saved Session ID:', result.session_id);
                navigate('/sessionhistory');
            } else {
                // Handle error responses
                console.error('Failed to save study session:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving study session:', error);
        }
        navigate('/sessionhistory');
    };

    const toggleTimer = () => {
        setIsTimerRunning(!isTimerRunning);
    };

    const formatTime = time => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="study-session-container">
            <h2>Study Session: Priming</h2>
            <p>
                {state?.method && studyMethodDetails[state.method]
                    ? studyMethodDetails[state.method].description
                    : 'General study session description.'}
            </p>
            <div className="timer">
                {formatTime(timer)}
                <button onClick={toggleTimer}>
                    {isTimerRunning ? 'Pause' : 'Start'}
                </button>
            </div>
            <div>
                <p>During this Priming session, focus on briefly exposing yourself to key concepts related to your study material.</p>
                <p>Consider reviewing important definitions, formulas, or key points that will be central to your upcoming learning sessions.</p>
            </div>
            <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Take notes here..."
            />
            <button onClick={handleEndSession}>End Session</button>
        </div>
    );
};

export default Priming;
