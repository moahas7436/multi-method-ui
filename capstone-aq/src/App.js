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
  constructor(props) {
super(props)
    this.state = {
      activeTab: '/',
    }
  }

  setActiveTab = (tab) => {
  this.setState({ activeTab: tab }, () => {
    console.log(this.state.activeTab); // This will log the updated state value
  });
};
  render() {
    console.log(this.state.activeTab)
    return (
      <BrowserRouter>
       <div className="App">
          {/* Render NavigationBar only if activeTab is set */}
          {this.state.activeTab !== '/' && this.state.activeTab !== '/login' && this.state.activeTab !== '/register' && (
    <NavigationBar active={this.state.activeTab} />)}          <Routes>
            <Route
              path="/"
              element={<Login setActiveTab={this.setActiveTab} />} // Pass setActiveTab as a prop
            />
            <Route
              path="/home"
              element={<Home setActiveTab={this.setActiveTab} />} // Pass setActiveTab as a prop
            />
            <Route path="/register" element={<Register setActiveTab={this.setActiveTab} />} />
            <Route
              path="/study-methods"
              element={<StudyMethods setActiveTab={this.setActiveTab} />} // Pass setActiveTab as a prop
            />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/results" element={<Results />} />
            <Route path="/studysession" element={<StudySession />} />
            <Route path="/sessionhistory" element={<SessionHistory />} />
            <Route path="/profile" element={<Profile />} />
            {/* New route for the profile page */}
            {/* <Route path="*" element={<NotFoundPage />} /> Optional 404 page */}
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
