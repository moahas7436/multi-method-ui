import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Make sure to create a corresponding CSS file

export class Home extends Component {

    continueSession = () => {
        console.log("Continuing session..."); 
    };

    render() {
        return (
            <div className="home-container">
                <h1>Welcome to the Multi-Method Study Assistant!</h1>
                <button className="continue-session-btn" onClick={this.continueSession}>
                    Continue Your Session
                </button>
                <p>Your personalized study hub.</p>
                <div className="dashboard">
                    <Link to="/assessment" className="dashboard-link">Take Assessment</Link>
                    <Link to="/study-methods" className="dashboard-link">View Study Methods</Link>
                    <Link to="/session-tracker" className="dashboard-link">Track Your Sessions</Link>
                    <Link to="/profile" className="dashboard-link">Your Profile</Link>
                </div>
            </div>
        );
    }
}

export default Home;
