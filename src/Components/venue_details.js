import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";


const VenueDetails = () => {
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
        const response = await fetch(`https://backend-4gbl.onrender.com/api/venues/${venueId}`);

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
      <h2>{event.venueName}</h2>
      <div>
        <strong>Location:</strong> {event.location}
      </div>
      <div>
        <strong>Sport:</strong> {event.sportName}
      </div>
      <div>
        <strong>Description:</strong> {event.description}
      </div>
      <div><strong>Date:</strong> {event?.date?.split('T')[0]}</div>
      <div><strong>Cost:</strong> {event.cost}<strong>$</strong></div>
      <div>
        <strong>Available Time Slots:</strong>
        <ul>
          {event.availableTimeSlots.map((timeSlot, index) => (
            <li key={index}>{timeSlot}</li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Ratings:</strong> {event.rating}{" "}
        <span className="star-ratings">
          {Array.from({ length: event.rating }, (_, i) => (
            <i key={i} className="fas fa-star"></i>
          ))}
        </span>
      </div>
      <div>
        <strong>Facilities/Amenities:</strong>
        <ul>
          {event.facilities.map((facility, index) => (
            <li key={index}>{facility}</li>
          ))}
        </ul>
      </div>
      <div>
        <img src={event.architecturalMapImage} alt="Map" />
      </div>
      <form>
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

export default VenueDetails;
