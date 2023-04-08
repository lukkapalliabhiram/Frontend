import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import EditProfile from "./Components/EditProfile";
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { setLightTheme, setDarkTheme } from './theme';

const cookies = new Cookies();
const ProfileButton = ({ user, onEditProfileClick, onLogoutClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const fullName = user.name;
  let fName = '';
  let lName = '';

  if (fullName) {
    const nameParts = fullName.split(" ");
    fName = nameParts[0];
    lName = nameParts[1];
  }
  const handleDropdownOpen = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEditProfileClick = () => {
    setIsDropdownOpen(false);
    onEditProfileClick();
  };



  return (
    <div className="profile-button">
      <button onClick={handleDropdownOpen}>Profile</button>
      {isDropdownOpen && (
        <div className="dropdown">
          <div className="profile-details">
            <div className="profile-detail">
              <label htmlFor="firstName">First Name:</label>
              <span id="firstName">{fName}</span>
            </div>
            <div className="profile-detail">
              <label htmlFor="lastName">Last Name:</label>
              <span id="lastName">{lName}</span>
            </div>
            <div className="profile-detail">
              <label htmlFor="username">Username:</label>
              <span id="username">{user.name}</span>
            </div>
            <div className="profile-detail">
              <label htmlFor="email">Email Address:</label>
              <span id="email">{user.email}</span>
            </div>
            <div className="profile-detail">
              <label htmlFor="password">Password:</label>
              <span id="password">*********</span>
            </div>
            <div className="profile-detail">
              <label htmlFor="mobileNumber">Mobile Number:</label>
              <span id="mobileNumber">{user.mobileNumber}</span>
            </div>
          </div>
          <button className="edit-profile" onClick={handleEditProfileClick}>
            Edit Profile
          </button>
          <button className="logout" onClick={onLogoutClick}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

const Header = ({ user }) => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const navigate = useNavigate();
  const handleEditProfileClick = () => {
    setShowEditProfile(true);
  };

  const handleEditProfileClose = () => {
    setShowEditProfile(false);
  };

  const handleLogoutClick = () => {
    const allCookies = cookies.getAll();
    Object.keys(allCookies).forEach((cookieName) => {
      cookies.remove(cookieName);
    });
    window.location.href = '/';
  };

  const handleLightClick = () => {
    setLightTheme();
  }

  const handleDarkClick = () => {
    setDarkTheme();
  }


  return (
    <div className="header">
      <header>
        <div className="logo">
          <img src="https://via.placeholder.com/50" alt="Logo" />
          <h1>Event Management System</h1>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard" >Home</Link>
            </li>
            <li>
              <Link to="/filter_search">Search Events</Link>
            </li>
            <li>
              <Link to="/my_reservations">My Reservations</Link>
            </li>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
            <li>
              <ProfileButton
                user={user}
                onEditProfileClick={handleEditProfileClick}
                onLogoutClick={handleLogoutClick}
              />
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {showEditProfile && (
          <EditProfile
            user={user}
            onSave={() => console.log("Profile saved!")}
            onClose={handleEditProfileClose}
          />
        )}
        {/* Your main content here */}
      </main>
    </div>
  );
};
export default Header;