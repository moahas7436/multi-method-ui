import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import './Login.css';
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegisterNavigate = () => {
        navigate('/register');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
        // Additional logic for handleSubmit
    };

    return (
        <div className="login-container">
            <div className="navigation-bar">
                {/* Navigation Bar Content */}
            </div>
            
            <div className="login-section">
                <h2>Log In</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                            id="email"
                            name="email"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                            id="password"
                            name="password"
                            className="form-control"
                        />
                    </div>
                    <Button variant="primary" type="submit">Log In</Button>
                </form>
            </div>
            
            <div className="get-started-section">
                <h3>Get Started</h3>
                <p>Join us now to enhance your study methods!</p>
                <button onClick={handleRegisterNavigate} className="get-started-button">
                    Register
                </button>
            </div>
        </div>
    );
};

export default Login;
