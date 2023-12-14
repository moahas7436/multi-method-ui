import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import { useState, useEffect } from 'react';


export const Home = ({setActiveTab}) => {
    const navigate = useNavigate();

    const continueSession = () => {
        console.log("Continuing session...");
        navigate('/studysession'); // Navigate to StudySession page
        // In a real app, fetch the last session's data and resume it
    };
    useEffect(() => {
        // Reset the activeTab to 'register' when the component renders
        setActiveTab('/home');
      }, []);
    return (
        <div className="home-container">
            <h1>Welcome to the Multi-Method Study Assistant!</h1>
            <button className="continue-session-btn" onClick={continueSession}>
                Continue Your Session
            </button>
            <p>Your personalized study hub.</p>
            <div className="dashboard">
                <Link to="/assessment" className="dashboard-link">Take Assessment</Link>
                <Link to="/study-methods" className="dashboard-link">View Study Methods</Link>
                <Link to="/sessionhistory" className="dashboard-link">Your Study Sessions</Link>
                <Link to="/profile" className="dashboard-link">Your Profile</Link>
            </div>
        </div>
    );
};

export default Home;
