import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import {sendBookingData} from "../api"



function BookingPage({ data, user }) {
  const navigate = useNavigate();
  const venueIndex = window.location.pathname.split("/").pop();
  const [bookingTime, setBookingTime] = useState("");
  const { item } = useLocation().state;
  const venue = item;
  const venue_type="venue";
  const userEmail=user.email;
  console.log(venue);

  const handleBooking = async (e) => {
    e.preventDefault();
      // Redirect to the payments page
    navigate(`/payments/${venueIndex}`, { state: { venue, bookingTime, venue_type } });
  };
  

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };
  


  return (
    <div className="booking-page">
      <div className="venue-details">
        <h2>{venue.venueName}</h2>
        <div>
          <strong>Location:</strong> {venue.location}
        </div>
        <div>
          <strong>Sport:</strong> {venue.sportName}
        </div>
        <div>
          <strong>Description:</strong> {venue.description}
        </div>
        <div><strong>Date:</strong> {item?.date?.split('T')[0]}</div>
        <div><strong>Cost:</strong> {item.cost}<strong>$</strong></div>
        <div>
          <strong>Available Time Slots:</strong>
          <ul>
            {venue.availableTimeSlots.map((timeSlot, index) => (
              <li key={index}>{timeSlot}</li>
            ))}
          </ul>
        </div>
        <div>
          <strong>Ratings:</strong> {venue.rating}{" "}
          <span className="star-ratings">
            {Array.from({ length: venue.rating }, (_, i) => (
              <i key={i} className="fas fa-star"></i>
            ))}
          </span>
        </div>
        <div>
          <strong>Facilities/Amenities:</strong>
          <ul>
            {venue.facilities.map((facility, index) => (
              <li key={index}>{facility}</li>
            ))}
          </ul>
        </div>
        <div>
          <img src={venue.architecturalMapImage} alt="Map" />
        </div>
        <form onSubmit={handleBooking}>
          <h3>Book a Time Slot</h3>
          <select
            value={bookingTime}
            onChange={(e) => setBookingTime(e.target.value)}
          >
            <option value="">Select a time slot</option>
            {venue.availableTimeSlots.map((timeSlot, index) => (
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
        <button onClick={handleBackClick} className="back-button">
          Back
        </button>
      </div>
    </div>
  );
}

export default BookingPage;
