import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";


const VenueDetails3 = () => {
  const { venueId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingTime, setBookingTime] = useState("");

  useEffect(() => {
    const fetchEventDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://backend-4gbl.onrender.com/api/players/${venueId}`);

        if (response.ok) {
          const eventData = await response.json();
          setEvent(eventData);
        } else {
          setError('Error fetching event details. Please try again.');
        }
      } catch (err) {
        setError('Error fetching event details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [venueId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!event) {
    return <div>No event found.</div>;
  }

  return (
    <div
      className="booking-page"
      style={{
        backgroundColor: "black",
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        position: "relative",
        color:"white",
      }}
    >
      <h2>Player Details</h2>
      <div>
        <img src={event.image} alt="Player" />
      </div>
      <div>
        <h3>{event.playerName}</h3>
        <div><strong>Gender:</strong> {event.playerGender}</div>
        <div><strong>Age Range:</strong> {event.playerAgeRange}</div>
        <div><strong>Skill Level:</strong> {event.playerSkillLevel}</div>
        <div><strong>Availability:</strong> {event.playerAvailability}</div>
        <div><strong>Sport/Activity:</strong> {event.playerSportActivity}</div>
        <div><strong>Description:</strong> {event.description}</div>
        <div><strong>Email:</strong> {event.emailId}</div>
        <div><strong>Phone Number:</strong> {event.phoneNumber}</div>
        <div><strong>Address:</strong> {event.address}</div>
      </div>
      <form >
      <h3>Available Time Slots</h3>
        {/* <select
          value={bookingTime}
          onChange={(e) => setBookingTime(e.target.value)}
        >
          <option value="">Select a time slot</option>
          {event.availableTimeSlots.map((timeSlot, index) => (
            <option key={index} value={timeSlot}>
              {timeSlot}
            </option>
          ))}
        </select> */}
        <ul>
          {event.availableTimeSlots.map((timeSlot, index) => (
            <li>{timeSlot}</li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default VenueDetails3;
