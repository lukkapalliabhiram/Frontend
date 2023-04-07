import { useLocation } from 'react-router-dom';

function ConfirmationPage() {
  const { venue,bookingTime, paymentMethod } = useLocation().state;

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
