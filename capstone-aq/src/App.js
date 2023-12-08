import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import StudyMethods from './components/StudyMethods';
import Assessment from './components/Assessment';
import NavigationBar from './components/NavigationBar';
import './App.css';
import './components/NavigationBar.css';
import Results from './components/Results';

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
            <Route path="/studymethods" element={<StudyMethods />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/results" element={<Results />} />
            {/* <Route path="*" element={<NotFoundPage />} /> Optional 404 page */}
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
