import React, { useState, useEffect } from 'react';
import './StudySession.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Pomodoro from './studyMethods/Pomodoro';
import ThreeTwoOne from './studyMethods/ThreeTwoOne';
import Cookies from 'js-cookie';
import SpacedRepetition from './studyMethods/SpacedRepetition';
import Priming from './studyMethods/Priming';
import Feynman from './studyMethods/Feynman';
export const StudySession = ({}) => {
    const userId = Cookies.get('user_id');

    const { state } = useLocation();
    const navigate = useNavigate();
    const [notes, setNotes] = useState('');
    const [timer, setTimer] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    useEffect(() => {
        const existingUserId = Cookies.get('user_id');

        if (!existingUserId) {
            // Redirect to the login page if userId cookie is not present
            navigate('/');
        }
    }, [navigate]); // Include navigate in the dependency array
    const studyMethodDetails = {
        "Pomodoro Technique": {
            sessionTime: 1500, // 25 minutes
            description: "The Pomodoro Technique involves breaking work into intervals, traditionally 25 minutes in length, separated by short breaks."
        },
        '321 Method': {
            sessionTime: 3600, // 60 minutes
            description: "The 321 method involves 3 hours of studying, 2 hours of break, and 1 hour of review."
        },
        'Feynman Technique': {
            sessionTime: 1800, // 30 minutes
            description: "The Feynman Technique involves teaching a concept you are trying to learn to someone else."
        },
   
        "Priming": {
            sessionTime: 2400, // 40 minutes
            description: "Priming involves preparing the brain for learning with a brief preliminary exposure to key concepts."
        }
    };

    useEffect(() => {
        if (state && state.method) {

        const methodDetail = state?.method && studyMethodDetails[state.method];
        if (methodDetail) {
            setTimer(methodDetail.sessionTime);
        } else {
            // Handle the case where method is not found
            setTimer(0); // Set default timer or handle appropriately
        }}
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
    {state && state.method ? (
        // Rendering content based on state.method
        // Example: You can render different components based on the method
        <>
            {state.method === 'Pomodoro Technique' ? (
                // Render Pomodoro component
                <Pomodoro userId={userId} />
            ) : state.method === '321 Method' ? (
                // Render ThreeTwoOne component
                <ThreeTwoOne userId={userId} />
            ) : state.method === 'Feynman Technique' ? (
                // Render Feynman component
                <Feynman />
            ) : state.method === 'Spaced Repetition' ? (
                // Render SpacedRepetition component
                <SpacedRepetition />
            ) : state.method === 'Priming' ? (
                // Render Priming component
                <Priming />
            ) : (
                // Handle unknown study method
                <div>Unknown study method: {state.method}</div>
            )}
        </>
    ) : (
        // Handle the case when state or state.method is null
        <div>No study method selected</div>
    )}
</div>
  );
        // <div className="study-session-container">
        //       <h2>Study Session: {state?.method || "General Study"}</h2>
        //     <p>{state?.method && studyMethodDetails[state.method] ? studyMethodDetails[state.method].description : "General study session description."}</p>
        //     <div className="timer">
        //         {formatTime(timer)}
        //         <button onClick={toggleTimer}>
        //             {isTimerRunning ? 'Pause' : 'Start'}
        //         </button>
        //     </div>
        //     <textarea
        //         value={notes}
        //         onChange={e => setNotes(e.target.value)}
        //         placeholder="Take notes here..."
        //     />
        //     <button onClick={handleEndSession}>End Session</button>
        // </div>
    
};

export default StudySession;