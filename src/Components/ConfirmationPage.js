import { useLocation } from 'react-router-dom';
import { useEffect } from "react";

// Add this import at the top of your file
import axios from "axios";




function ConfirmationPage(user) {

  const { venue,bookingTime, paymentMethod } = useLocation().state;

  async function sendConfirmationEmail(user, venue, bookingTime) {
    console.log(user.user.email)
    try {
      await axios.post("https://backend-4gbl.onrender.com/send-confirmation-email", {
        userEmail: user.user.email,
        bookingTime,
      });
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending confirmation email:", error);
    }
  }

  useEffect(() => {
    console.log(user)
    sendConfirmationEmail(user, venue, bookingTime);
  }, [user, venue, bookingTime]);

  return (
    <div className="booking-page">
      <h2>Booking Confirmed</h2>
      <div className="venue-details">
        <h3>{venue.venueName}</h3>
        <div>
          <strong>Location:</strong> {venue.location}
          {venue.address}
          {venue.activityLocation}
        </div>
        <div>
          <strong>Sport:</strong> {venue.sportName}
          {venue.activityName}
          {venue.playerSportActivity}
        </div>
        <div>
          <strong>Time Slot:</strong> {bookingTime}
        </div>
        <div>
          <strong>Cost:</strong> {venue?.date?.split('T')[0]}
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPage;
