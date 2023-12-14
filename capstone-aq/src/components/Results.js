import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Results.css';

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const recommendedMethod = location.state?.recommendedMethod || "Unsure";

    const renderResultsMessage = () => {
        if (recommendedMethod === "Suggested Starting Point") {
            return "Based on your assessment, we suggest starting with an introductory session to help you find the right approach.";
        } else if (recommendedMethod === "Unsure") {
            return "It seems we couldn't determine a clear study method preference. Consider trying different methods to find what works best for you.";
        } else {
            return `Here's a brief overview of why the ${recommendedMethod} method is suitable for you based on your assessment.`;
        }
    };

    const handleStartSession = () => {
        console.log('Starting session with method:', recommendedMethod);
        navigate('/studysession', { state: { method: recommendedMethod } });
    };
    
    const handleOtherMethods = () => {
        navigate('/study-methods');
    };
    
    return (
        <div className="results-container">
            <h2>Your Recommended Study Method</h2>
            <div className="result">
                <h3>{recommendedMethod !== "Unsure" ? recommendedMethod : "Explore Methods"}</h3>
                <p>{renderResultsMessage()}</p>
                {/* Additional details about the method or next steps can be added here */}
            </div>
            <button onClick={handleStartSession} className="start-session-button">Start a Session</button>
            <button onClick={handleOtherMethods} className="start-session-button">View Other Methods</button>

        </div>
    );
};

export default Results;
