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
                 <p>Your personalized study hub.</p>
         
       
            <div className="dashboard">
            <button className="continue-session-btn" onClick={continueSession}>
                Continue Your Session
            </button>
            <Link to="/sessionhistory" className="dashboard-link">Your Study Sessions</Link>
<div style={{padding: "50px"}}></div>
                <Link to="/assessment" className="dashboard-link-two">Take Assessment Again</Link>
                <Link to="/study-methods" className="dashboard-link-two">View Study Methods</Link>
            </div>
        </div>
    );
};

export default Home;
