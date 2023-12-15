import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudyMethods.css';

export const StudyMethods = ({ userId }) => {
    const navigate = useNavigate();
    const [methods, setMethods] = useState([
        {
            id: 1,
            name: 'Pomodoro Technique',
            description: '25-minute focused work sessions with 5-minute breaks.',
            details: 'n/a'
        },
        {
            id: 2,
            name: '321 Method',
            description: '3 hours of studying, 2 hours of break, and 1 hour of review.',
            details: 'n/a'
        },
        {
            id: 3,
            name: 'Feynman Technique',
            description: 'Learning by teaching and simplifying concepts.',
            details: 'n/a'
        },
        {
            id: 4,
            name: 'Spaced Repetition',
            description: 'Spreading out study sessions over time to improve long-term retention.',
            details: 'n/a'
        },
        {
            id: 5,
            name: 'Priming',
            description: 'Preparing the brain for learning with brief exposure to key concepts.',
            details: 'n/a'
        }
    ]);

    // Toggles the display of method details
    const toggleDetails = (id) => {
        setMethods(methods.map(method => {
            if (method.id === id) {
                return { ...method, showDetails: !method.showDetails };
            }
            return method;
        }));
    };

    // Start session with the selected method
    const startSession = (method) => {
        navigate('/studysession', { state: { method: method.name } });
    };

    return (
        <div className="study-methods-container">
            <h1>Study Methods</h1>
            <ul>
                {methods.map(method => (
                    <li key={method.id} className="method-item">
                        <h2 onClick={() => toggleDetails(method.id)}>{method.name}</h2>
                        {method.showDetails && (
                            <div>
                                <p>{method.description}</p>
                                <button onClick={() => startSession(method)}>Wanna start this session</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StudyMethods;
