import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ActivityDetails = () => {
  const location = useLocation();
  const activityIndex = window.location.pathname.split("/").pop();
  const [bookingTime, setBookingTime] = useState("");
  const navigate = useNavigate();
  const { item } = location.state;
  const venue=item;
  const venue_type="activity";
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  const handleTimeSlotChange = (event) => {
    setSelectedTimeSlot(event.target.value);
  };

  const handlePaymentClick = () => {
    // TODO: Send selectedTimeSlot and item data to server and proceed to payment page
    navigate(`/payments/${activityIndex}`, { state: { venue, bookingTime, venue_type } });
  };

  return (
    <div className="booking-page">
    <div className="venue-details">
      <h2>Activity Details</h2>
      <div>
        <strong>Activity Name:</strong> {item.activityName}
      </div>
      <div>
        <strong>Location:</strong> {item.activityLocation}
      </div>
      <div>
        <strong>Age Range:</strong> {item.ageRange}
      </div>
      <div>
        <strong>Cost:</strong> {item.cost}
      </div>
      <div>
        <strong>Description:</strong> {item.description}
      </div>
      <div>
        <strong>Maximum Capacity Reached:</strong>{" "}
        {item.maximumCapacityReached ? "Yes" : "No"}
      </div>
      <form onSubmit={handlePaymentClick}>
          <h3>Book a Time Slot</h3>
          <select
            value={bookingTime}
            onChange={(e) => setBookingTime(e.target.value)}
          >
            <option value="">Select a time slot</option>
            {item.availableTimeSlots.map((timeSlot, index) => (
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

export default ActivityDetails;
