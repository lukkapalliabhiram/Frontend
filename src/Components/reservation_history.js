import { useState, useEffect } from "react";
import "../App.css";
import { fetchReservationsForUser } from "../api";
import { updateReservationRating } from "../api";

function Reservation(user) {
  const [ratings, setRatings] = useState({}); // Object to store ratings
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [reservations, setreservations] = useState([]);
  const userEmail = user.user.email;
  console.log(reservations)
  const PastvenueReservations = reservations.filter(
    (reservation) => reservation.venue_type === 'venue'
  );
  const PastactivityReservations = reservations.filter(
    (reservation) => reservation.venue_type === 'activity'
  );
  const PasteventReservations = reservations.filter(
    (reservation) => reservation.venue_type === 'player'
  );


  const filterPastReservations = (reservations) => {
    return reservations.filter((reservation) => {
      const eventDate = new Date(reservation.eventDetails?.date);
      const currentDate = new Date();
      return eventDate < currentDate;
    });
  };


  const handleRatingChange = async (reservation, rating) => {
    try {
      const reservationId = reservation._id;
      await updateReservationRating(reservationId, rating);
      setRatings({
        ...ratings,
        [reservationId]: rating, // Update ratings object with new rating
      });
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };
  


  useEffect(() => {
    const fetchReservations = async () => {
      const fetchedReservations = await fetchReservationsForUser(userEmail);
      setreservations(fetchedReservations);
    };

    fetchReservations();
  }, []);

  const venueReservations = filterPastReservations(PastvenueReservations);
  const activityReservations = filterPastReservations(PastactivityReservations);
  const eventReservations = filterPastReservations(PasteventReservations);




  const handleReservationClick = (reservation) => {
    console.log("Selected reservation:", reservation.eventDetails);
    setSelectedReservation(reservation.eventDetails);
  };



  function renderReservationDetails() {
    console.log("Render reservation details");
    if (!selectedReservation) {
      return null;
    }

    return (
      <div className="reservation-details-popup">
        <h2>Reservation Details</h2>
        {selectedReservation.hasOwnProperty('venueName') && (
          <>
            <h2>{selectedReservation.venueName}</h2>

            <p><strong>Location:</strong> {selectedReservation.location}</p>


            <p><strong>Sport:</strong> {selectedReservation.sportName}</p>


            <p><strong>Description:</strong> {selectedReservation.description}</p>

            <p>
              {(() => {
                if (selectedReservation.date) {
                  const dateObj = new Date(selectedReservation.date);
                  const datePart = dateObj.toLocaleDateString();
                  const timePart = dateObj.toLocaleTimeString();
                  return `${datePart} at ${timePart}`;
                }
                return '';
              })()}
            </p>
            <p><strong>Cost:</strong> {selectedReservation.cost}<strong>$</strong></p>
            <p><strong>ownerEmail:</strong>{selectedReservation.venueOwnerEmail}</p>

            <div>
              <img src={selectedReservation.architecturalMapImage} alt="Map" />
            </div>
          </>
        )}

        {selectedReservation.hasOwnProperty('activityName') && (
          <>
            <p><strong>Activity Name:</strong> {selectedReservation.activityName}</p>
            <p><strong>Location:</strong> {selectedReservation.activityLocation}</p>
            <p><strong>Age Range:</strong> {selectedReservation.ageRange}</p>
            <p><strong>Description:</strong> {selectedReservation.description}</p>
            <p>
              {(() => {
                if (selectedReservation.date) {
                  const dateObj = new Date(selectedReservation.date);
                  const datePart = dateObj.toLocaleDateString();
                  const timePart = dateObj.toLocaleTimeString();
                  return `${datePart} at ${timePart}`;
                }
                return '';
              })()}
            </p>
            <p><strong>Cost:</strong> {selectedReservation.cost}</p>
          </>
        )}

        {selectedReservation.hasOwnProperty('playerGender') && (
          <>
            <h3>{selectedReservation.playerName}</h3>
            <p><strong>Gender:</strong> {selectedReservation.playerGender}</p>
            <p><strong>Age Range:</strong> {selectedReservation.playerAgeRange}</p>
            <p><strong>Skill Level:</strong> {selectedReservation.playerSkillLevel}</p>
            <p><strong>Availability:</strong> {selectedReservation.playerAvailability}</p>
            <p><strong>Sport/Activity:</strong> {selectedReservation.playerSportActivity}</p>
            <p><strong>Description:</strong> {selectedReservation.description}</p>
            <p><strong>Email:</strong> {selectedReservation.emailId}</p>
            <p><strong>Phone Number:</strong> {selectedReservation.phoneNumber}</p>
            <p><strong>Address:</strong> {selectedReservation.address}</p>
          </>
        )}

        <label>
          Rating:
          <select value={selectedReservation.rating} onChange={(e) => handleRatingChange(selectedReservation._id, e.target.value)}>
            <option value="">--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>

        <button onClick={() => setSelectedReservation(null)}>Close</button>
      </div>
    );
  }




  return (
    <div className="reservation-history">
      <h2>Reservation History</h2>
      {venueReservations.length > 0 && (
        <>
          <h3>Venue Reservations</h3>
          <ul>
            {venueReservations.map((reservation, index) => (
              <li key={index}>
                <h4>{reservation.eventDetails.venueName}</h4>
                <p>
                  {(() => {
                    if (reservation.eventDetails?.date) {
                      const dateObj = new Date(reservation.eventDetails.date);
                      const datePart = dateObj.toLocaleDateString();
                      const timePart = dateObj.toLocaleTimeString();
                      return `${datePart} at ${timePart}`;
                    }
                    return '';
                  })()}
                </p>
                <p><span className="Bold">Ratings:</span> {reservation.eventDetails.rating}</p>
                <label>
                  Rating:
                  <select
                    value={reservation.rating}
                    onChange={(e) => handleRatingChange(reservation, e.target.value)}
                  >                    <option value="">--</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </label>
                <button className="button" onClick={() => handleReservationClick(reservation)}>View Details</button>              </li>
            ))}
          </ul>
        </>
      )}
      {activityReservations.length > 0 && (
        <>
          <h3>Activity Reservations</h3>
          <ul>
            {activityReservations.map((reservation, index) => (
              <li key={index}>
                <h4>{reservation.eventDetails.activityName}</h4>
                <p>
                  {(() => {
                    if (reservation.eventDetails?.date) {
                      const dateObj = new Date(reservation.eventDetails.date);
                      const datePart = dateObj.toLocaleDateString();
                      const timePart = dateObj.toLocaleTimeString();
                      return `${datePart} at ${timePart}`;
                    }
                    return '';
                  })()}
                </p>
                <p><span className="Bold">Ratings:</span> {reservation.eventDetails.rating}</p>
                <label>
                  <span className="Bold">Rating:</span>
                  <select
                    value={reservation.rating}
                    onChange={(e) => handleRatingChange(reservation, e.target.value)}
                  >
                    <option value="">--</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </label>
                <button className="button" onClick={() => handleReservationClick(reservation)}>View Details</button>              </li>
            ))}
          </ul>
        </>
      )}
      {eventReservations.length > 0 && (
        <>
          <h3>Player Reservations</h3>
          <ul>
            {eventReservations.map((reservation, index) => (
              <li key={index}>
                <h4>{reservation.eventDetails.playerSportActivity}</h4>
                <p>{reservation.eventDetails.date?.split('T')[0]} at {reservation.eventDetails?.date?.split('T')[0]}</p>
                <button className="button" onClick={() => handleReservationClick(reservation)}>View Details</button>              </li>
            ))}
          </ul>
        </>
      )}
      {renderReservationDetails()}
      {reservations.length === 0 && (
        <p>No reservations to display.</p>
      )}
    </div>
  );
}

export default Reservation;
