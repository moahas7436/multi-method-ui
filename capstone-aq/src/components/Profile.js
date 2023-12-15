import React, { useState, useEffect } from 'react';
import './Profile.css';
import Cookies from 'js-cookie';
// ... (previous imports)

export const Profile = ({ setActiveTab }) => {
    const userId = Cookies.get('user_id');
    const [profile, setProfile] = useState({
      user_id: '',
      username: '',
      email: '',
      password_hash: '',
      first_name: '',
      last_name: '',
      date_joined: '',
    });
  
    useEffect(() => {
      // Reset the activeTab to 'register' when the component renders
      setActiveTab('/profile');
  
      // Fetch user profile from the backend
      const fetchUserProfile = async () => {
        try {
          const response = await fetch(`/api/get-profile?userId=${userId}`);
          if (response.ok) {
            const data = await response.json();
            setProfile(data); // Update state with fetched profile data
          } else {
            console.error('Failed to fetch user profile:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };
  
      if (userId) {
        fetchUserProfile();
      }
    }, [userId, setActiveTab]);
  
    return (
      <div className="profile-container">
        <h2>User Profile</h2>
        <div className="profile-details">
    
          <p>
            <strong>Username:</strong> {profile.username}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>

          <p>
            <strong>First Name:</strong> {profile.first_name}
          </p>
          <p>
            <strong>Last Name:</strong> {profile.last_name}
          </p>
          <p>
            <strong>Date Joined:</strong> {profile.date_joined}
          </p>
        </div>
        {/* Add functionality for editing profile details */}
      </div>
    );
  };
  
  export default Profile;
  