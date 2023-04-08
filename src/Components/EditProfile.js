import React, { useState } from 'react';
import './EditProfile.css'

function EditProfile({ user, onSave, onClose }) { 
  const [firstName, setFirstName] = useState(user.fname);
  const [lastName, setLastName] = useState(user.lname);
  const [username, setUsername] = useState(user.fname);
  const [email, setEmail] = useState(user.email);
  const BASE_URL = "https://backend-4gbl.onrender.com";
  const [mobileNumber, setMobileNumber] = useState(user.mobileNumber);

  const handleSave = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/users/update/${user.email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, username, email, mobileNumber }),
      });
  
      const result = await response.json();
      if (result.success) {
        onSave({ firstName, lastName, username, email, mobileNumber });
      } else {
        console.error('Error updating user profile:', result.error);
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };
  

  return (
    <div className="edit-profile1">
        <div className='dropdown'>
      <h2>Edit Profile</h2>
      <form>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />

        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label htmlFor="email">Email Address:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="mobileNumber">Mobile Number:</label>
        <input type="tel" id="mobileNumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />

        <div className="buttons">
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={onClose}>Close</button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default EditProfile;
