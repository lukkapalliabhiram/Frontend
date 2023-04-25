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

  const profileStyles = {
    profileButton: {
      position: 'relative',
      marginLeft: 'auto',
    },
    button: {
      backgroundColor: 'var(--background-color)',
      color: 'var(--text-color)',
      border: '2px solid',
      padding: '10px',
      fontSize: '18px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    dropdown: {
      color: 'white',
      position: 'absolute',
      top: '70px',
      right: '10px',
      width: '250px',
      padding: '20px',
      backgroundColor: 'green',
      borderRadius: '10px',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
      zIndex: 1,
    },
    profileDetails: {
      marginBottom: '20px',
    },
    profileDetail: {
      marginBottom: '10px',
    },
    label: {
      display: 'inline-block',
      width: '120px',
      fontWeight: 'bold',
    },
    span: {
      display: 'inline-block',
      width: '120px',
    },
    editProfile: {
      display: 'block',
      width: '100%',
      marginBottom: '10px',
      padding: '10px',
      border: 'none',
      backgroundColor: 'green',
      color: 'black',
      fontSize: '16px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    logout: {
      display: 'block',
      width: '100%',
      marginBottom: '10px',
      padding: '10px',
      border: 'none',
      backgroundColor: 'green',
      color: 'black',
      fontSize: '16px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
  };

  return (
    <div className="profile-button" style={profileStyles.profileButton}>
      <button onClick={handleDropdownOpen} style={profileStyles.button}>
        Profile
      </button>
      {isDropdownOpen && (
        <div className="dropdown" style={profileStyles.dropdown}>
          <div className="profile-details" style={profileStyles.profileDetails}>
            <div className="profile-detail" style={profileStyles.profileDetail}>
              <label htmlFor="firstName" style={profileStyles.label}>First Name:</label>
              <span id="firstName" style={profileStyles.span}>{fName}</span>
            </div>
            <div className="profile-detail" style={profileStyles.profileDetail}>
              <label htmlFor="lastName" style={profileStyles.label}>Last Name:</label>
              <span id="lastName" style={profileStyles.span}>{lName}</span>
            </div>
            <div className="profile-detail" style={profileStyles.profileDetail}>
              <label htmlFor="username" style={profileStyles.label}>Username:</label>
              <span id="username" style={profileStyles.span}>{user.name}</span>
            </div>
            <div className="profile-detail" style={profileStyles.profileDetail}>
              <label htmlFor="email" style={profileStyles.label}>Email Address:</label>
              <span id="email" style={profileStyles.span}>{user.email}</span>
            </div>
            <div className="profile-detail" style={profileStyles.profileDetail}>
              <label htmlFor="password" style={profileStyles.label}>Password:</label>
              <span id="password" style={profileStyles.span}>*********</span>
            </div>
            {/* <div className="profile-detail" style={profileStyles.profileDetail}>
              <label htmlFor="mobileNumber" style={profileStyles.label}>Mobile Number:</label>
              <span id="mobileNumber" style={profileStyles.span}>{user.mobileNumber}</span>
            </div> */}
          </div>
          <button
            className="edit-profile"
            onClick={handleEditProfileClick}
            style={profileStyles.button}
          >
            Edit Profile
          </button>
          <button className="logout" onClick={onLogoutClick} style={profileStyles.button}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
  
};


const headerStyles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "var(--background-color)",
    padding: "10px",
    color: "var(--text-color)",
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    zIndex: "100",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    marginRight: "20px",
  },
  navUl: {
    display: "flex",
    listStyle: "none",
    margin: "0",
    padding: "0",
  },
  navLi: {
    marginLeft: "20px",
  },
  navA: {
    color: "var(--text-color)",
    textDecoration: "none",
    fontSize: "18px",
    padding: "10px",
    transition: "all 0.3s ease",
  },
  profileButton: {
    position: "relative",
    marginLeft: "auto",
  },
  profileBtn: {
    backgroundColor: "var(--background-color)",
    color: "var(--text-color)",
    border: "2px solid",
    padding: "10px",
    fontSize: "18px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  darkMode: {
    position: "relative",
    marginLeft: "auto",
  },
  darkModeBtn: {
    backgroundColor: "black",
    color: "var(--text-color)",
    border: "2px solid",
    padding: "10px",
    fontSize: "13px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginLeft: "10px",
  },
  dropdown: {
    color: "white",
    position: "absolute",
    top: "70px",
    right: "10px",
    width: "250px",
    padding: "20px",
    backgroundColor: "green",
    borderRadius: "10px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
    zIndex: "1",
  },
  profileDetails: {
    marginBottom: "20px",
  },
  profileDetail: {
    marginBottom: "10px",
  },
  profileDetailLabel: {
    display: "inline-block",
    width: "120px",
    fontWeight: "bold",
  },
  profileDetailSpan: {
    display: "inline-block",
    width: "120px",
  },
  editProfile: {
    display: "block",
    width: "100%",
    marginBottom: "10px",
    padding: "10px",
    border: "none",
    backgroundColor: "green",
    color: "black",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  logout: {
    display: "block",
    width: "100%",
    marginBottom: "10px",
    padding: "10px",
    border: "none",
    backgroundColor: "green",
    color: "black",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
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

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    // Optionally, save the user's preference in local storage
    localStorage.setItem('theme', newTheme);
  }

  return (
    <div className="header">
      <header style={headerStyles.header}>
        <div className="logo" style={headerStyles.logo}>
          <h1>HanabiYuga</h1>
        </div>
        <nav>
          <ul style={headerStyles.navUl}>
            <li style={headerStyles.navLi}>
              <Link to="/dashboard" style={headerStyles.navA}>Home</Link>
            </li>
            <li style={headerStyles.navLi}>
              <Link to="/filter_search" style={headerStyles.navA}>Search Events</Link>
            </li>
            <li style={headerStyles.navLi}>
              <Link to="/my_reservations" style={headerStyles.navA}>My Reservations</Link>
            </li>
            {user.role === 1 && (
              <li style={headerStyles.navLi}>
                <Link to="/my_venues" style={headerStyles.navA}>My Venues</Link>
              </li>
            )}
            {user.role === 1 && (
              <li style={headerStyles.navLi}>
                <Link to="/my_activities" style={headerStyles.navA}>My Activities</Link>
              </li>
            )}
            <li style={headerStyles.navLi}>
              <ProfileButton
                user={user}
                onEditProfileClick={handleEditProfileClick}
                onLogoutClick={handleLogoutClick}
                style={headerStyles.profileButton}
              />
            </li>
            <li className="dark-mode" style={headerStyles.darkMode}>
              <button onClick={toggleTheme} style={headerStyles.darkModeButton}>⛅</button>
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
