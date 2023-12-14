import React from 'react';
import './SessionHistory.css';
import { useState, useEffect } from 'react'

export const SessionHistory = ({ userId }) => {
    // Dummy data for the example. You will fetch this data from your backend/database.
    const [sessionHistoryData, setSessionHistoryData] = useState([]);

    const getDate = (obj) => {
        const timestamp = obj;
        const dateObject = new Date(timestamp);

        // Get the date in YYYY-MM-DD format
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
        const day = String(dateObject.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        console.log(formattedDate); // Output: "2023-12-14"
        return formattedDate
    }
    // const sessionHistoryData = [
    //     {
    //         date: new Date().toLocaleDateString(),
    //         method: 'Pomodoro',
    //         notes: 'Studied chapter 5 of history textbook',
    //     },
    //     // More sessions...
    // ];
    useEffect(() => {
        // Fetch session history data for the specified user from your backend or API
        // You may need to replace '/api/get-session-history' with your actual endpoint
        fetch(`/api/get-session-history?userId=${userId}`)
            .then((response) => response.json())
            .then((data) => {
                // Set the fetched session history data in the state
                setSessionHistoryData(data);
                console.log(data)
                console.log(data[0].start_time)
            })
            .catch((error) => {
                console.error('Error fetching session history:', error);
            });
    }, [userId]);
    return (
        <div className="session-history-container">
            <h2>Study Session History</h2>

            {sessionHistoryData.map((session, index) => (
                <div key={index} className="session-history-entry">
                    <h3>Study Method: {session.method}</h3>
                    <p>{session.notes}</p>
                    <time>Date: {getDate(session.start_time)}</time>
                </div>
            ))}
        </div>
    );
};

export default SessionHistory;
