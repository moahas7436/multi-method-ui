import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import StudyMethods from './components/StudyMethods';
import Assessment from './components/Assessment';
import Results from './components/Results';
import StudySession from './components/StudySession';
import SessionHistory from './components/SessionHistory';
import Profile from './components/Profile'; // Import the Profile component
import NavigationBar from './components/NavigationBar';
import './App.css';
import './components/NavigationBar.css';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/study-methods" element={<StudyMethods />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/results" element={<Results />} />
            <Route path="/studysession" element={<StudySession />} />
            <Route path="/sessionhistory" element={<SessionHistory />} />
            <Route path="/profile" element={<Profile />} /> {/* New route for the profile page */}
            {/* <Route path="*" element={<NotFoundPage />} /> Optional 404 page */}
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
