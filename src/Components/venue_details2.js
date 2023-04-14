import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";


const VenueDetails2 = () => {
  const { venueId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingTime, setBookingTime] = useState("");

  console.log(venueId)
  useEffect(() => {
    const fetchEventDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://backend-4gbl.onrender.com/api/activities/${venueId}`);

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
        color: "white",
      }}
    >
      <h2>Activity Details</h2>
      <div>
        <strong>Activity Name:</strong> {event.activityName}
      </div>
      <div>
        <strong>Location:</strong> {event.activityLocation}
      </div>
      <div>
        <strong>Age Range:</strong> {event.ageRange}
      </div>
      <div>
        <strong>Cost:</strong> {event.cost}
      </div>
      <div>
        <strong>Description:</strong> {event.description}
      </div>
      <div>
        <strong>Maximum Capacity Reached:</strong>{" "}
        {event.maximumCapacityReached ? "Yes" : "No"}
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

export default VenueDetails2;
