import React from 'react';
import './Results.css';
import { useLocation } from 'react-router-dom';

export const Results = () => {
    const location = useLocation();
    const recommendedMethod = location.state?.recommendedMethod || "No clear preference";

    const getResultsMessage = () => {
        if (recommendedMethod === "No clear preference") {
            return "Based on your assessment, a specific study method wasn't clear. We suggest starting with an introductory session to help you find the right approach.";
        } else {
            return `Here's a brief overview of why the ${recommendedMethod} method is suitable for you based on your assessment.`;
        }
    };

    return (
        <div className="results-container">
            <h2>Your Recommended Study Method</h2>
            <div className="result">
                <h3>{recommendedMethod !== "No clear preference" ? recommendedMethod : "Introductory Session"}</h3>
                <p>{getResultsMessage()}</p>
            </div>
            <button className="start-session-button">Start a Session</button>
        </div>
    );
};

export default Results;
