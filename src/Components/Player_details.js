import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PlayerDetailsPage = () => {
    const location = useLocation();
    const playerIndex = window.location.pathname.split("/").pop();
    const [bookingTime, setBookingTime] = useState("");
    const navigate = useNavigate();
    const { item } = location.state;
    const player=item;
    const venue=item;
    const venue_type="player";
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const handleTimeSlotChange = (event) => {
    setSelectedTimeSlot(event.target.value);
  };

  const handleBookTimeSlot = () => {
    navigate(`/payments/${playerIndex}`, { state: { venue, bookingTime, venue_type } });
  };

  return (
    <div className="booking-page">
    <div className="venue-details">
      <h2>Player Details</h2>
      <div>
        <img src={player.image} alt="Player" />
      </div>
      <div>
        <h3>{player.playerName}</h3>
        <div><strong>Gender:</strong> {player.playerGender}</div>
        <div><strong>Age Range:</strong> {player.playerAgeRange}</div>
        <div><strong>Skill Level:</strong> {player.playerSkillLevel}</div>
        <div><strong>Availability:</strong> {player.playerAvailability}</div>
        <div><strong>Sport/Activity:</strong> {player.playerSportActivity}</div>
        <div><strong>Description:</strong> {player.description}</div>
        <div><strong>Email:</strong> {player.emailId}</div>
        <div><strong>Phone Number:</strong> {player.phoneNumber}</div>
        <div><strong>Address:</strong> {player.address}</div>
      </div>
      <form onSubmit={handleBookTimeSlot}>
          <h3>Book a Time Slot</h3>
          <select
            value={bookingTime}
            onChange={(e) => setBookingTime(e.target.value)}
          >
            <option value="">Select a time slot</option>
            {player.availableTimeSlots.map((timeSlot, index) => (
              <option key={index} value={timeSlot}>
                {timeSlot}
              </option>
            ))}
          </select>
          {bookingTime && (
            <p>
              Selected time slot: <strong>{bookingTime}</strong>
            </p>
          )}
          <button type="submit" disabled={!bookingTime}>
            Proceed to Payment
          </button>
        </form>
        </div>
    </div>
  );
};

export default PlayerDetailsPage;
