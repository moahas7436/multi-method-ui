import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import './Login.css';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; // Import the js-cookie library


export const Login = ({ setActiveTab, setUserId }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegisterNavigate = () => {
        setActiveTab('/register');

        navigate('/register');
    };
    useEffect(() => {
        // Reset the activeTab to 'register' when the component renders
        setActiveTab('/');
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create an object with the user's email and password
        const userData = {
            email: email,
            password: password
        };

        try {
            // Send a POST request to login endpoint
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                // Login was successful, handle the response here
                const data = await response.json();
                console.log('Login successful', data);

                // Store the JWT token in local storage or cookies for subsequent authenticated requests
                localStorage.setItem('token', data.token);
                Cookies.set('user_id', data.user_id, { expires: 7 }); // Expires in 7 days

                // Set the userId in the state
                setUserId(data.user_id);
                // Redirect to another page upon successful login
                navigate('/home'); 
            } else {
                // Login failed, handle the error
                console.error('Login failed');
                // Display an error message to the user here.
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle network errors or other unexpected issues here.
        }
    };


    return (
        <div className="login-container">
            <div className="navigation-bar">
                {/* Navigation Bar Content */}
            </div>
            <h1>Welcome to the Multi-Method Study Assistant!</h1>

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
