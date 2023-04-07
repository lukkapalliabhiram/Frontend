import React, { useState } from 'react';
import './EditProfile.css'

function EditProfile({ user, onSave, onClose }) { 
  const [firstName, setFirstName] = useState(user.fname);
  const [lastName, setLastName] = useState(user.lname);
  const [username, setUsername] = useState(user.fname);
  const [email, setEmail] = useState(user.email);
  const [mobileNumber, setMobileNumber] = useState(user.mobileNumber);

  const handleSave = () => {
    onSave({ firstName, lastName, username, email, mobileNumber });
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
