import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';


export const Home = ({ setActiveTab }) => {
    const navigate = useNavigate();
    const userId = Cookies.get('user_id');

    console.log(userId)

    useEffect(() => {
        // Reset the activeTab to 'register' when the component renders
        setActiveTab('/home');
    }, []);

    useEffect(() => {
        const existingUserId = Cookies.get('user_id');

        if (!existingUserId) {
            // Redirect to the login page if userId cookie is not present
            navigate('/');
        }
    }, [navigate]); // Include navigate in the dependency array
    return (
        <div className="home-container">
            <h1>Welcome to the Multi-Method Study Assistant!</h1>
            <p>Your personalized study hub.</p>


            <div className="dashboard">

                <Link to="/sessionhistory" className="dashboard-link">Your Study Sessions</Link>
                <Link to="/study-methods" className="dashboard-link">New Study Session</Link>

                <div style={{ padding: "50px" }}></div>
                <Link to="/assessment" className="dashboard-link-two">Take Assessment Again</Link>
                {/* <Link to="/study-methods" className="dashboard-link-two">View Study Methods</Link> */}
            </div>
        </div>
    );
};

export default Home;
