import React, { useState, useEffect } from 'react';
import './Profile.css';
import Cookies from 'js-cookie';
export const Profile = ({setActiveTab}) => {
    const userId = Cookies.get('user_id');

    useEffect(() => {
        // Reset the activeTab to 'register' when the component renders
        setActiveTab('/profile');
      }, []);
    // Sample state for user's profile data
    const [profile, setProfile] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
        preferredStudyMethod: "Pomodoro",
        studyProgress: {
            sessionsCompleted: 10,
            hoursStudied: 25
        }
    });

    // Add more functionalities as needed, like editing profile, etc.

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            <div className="profile-details">
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Preferred Study Method:</strong> {profile.preferredStudyMethod}</p>
                <p><strong>Study Sessions Completed:</strong> {profile.studyProgress.sessionsCompleted}</p>
                <p><strong>Total Hours Studied:</strong> {profile.studyProgress.hoursStudied}</p>
                {/* Add more details as needed */}
            </div>
            {/* Add functionality for editing profile details */}
        </div>
    );
};

export default Profile;
