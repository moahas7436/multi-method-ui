import React from 'react';
import './SessionHistory.css';

export const SessionHistory = () => {
    // Dummy data for the example. You will fetch this data from your backend/database.
    const sessionHistoryData = [
        {
            date: new Date().toLocaleDateString(),
            method: 'Pomodoro',
            notes: 'Studied chapter 5 of history textbook',
        },
        // More sessions...
    ];

    return (
        <div className="session-history-container">
            <h2>Study Session History</h2>
            {sessionHistoryData.map((session, index) => (
                <div key={index} className="session-history-entry">
                    <h3>Study Method: {session.method}</h3>
                    <p>{session.notes}</p>
                    <time>Date: {session.date}</time>
                </div>
            ))}
        </div>
    );
};

export default SessionHistory;
