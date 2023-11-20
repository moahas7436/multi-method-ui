import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import './Login.css';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, pass);
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Log In</h2>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="youremail@gmail.com"
                        id="email"
                        name="email"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        type="password"
                        placeholder="*********"
                        id="password"
                        name="password"
                        className="form-control"
                    />
                </div>
                <Button variant="primary" type="submit">
                    Log In
                </Button>
                <div className="secondary-action">
                    Don't have an account? Register here!
                </div>
            </form>
        </div>
    );
}

export default Login;
