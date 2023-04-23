import { useState, useEffect, useCallback } from "react";
import "../App.css";
import { fetchReservationsForUser, cancelReservationForUser } from "../api";
import { sendInvitationToFriend } from "../api";


function UpcomingReservations(user) {
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [reservations, setReservations] = useState([]);
  const userEmail = user.user.email;
  const userName = user.user.name;
  const [inviteEmail, setInviteEmail] = useState({});
  const [showInviteForm, setShowInviteForm] = useState(false);

  const filterUpcomingReservations = (reservations) => {
    return reservations.filter((reservation) => {
      const eventDate = new Date(reservation.eventDetails?.date);
      const currentDate = new Date();
      return eventDate >= currentDate;
    });
  };
  const cancelReservation = async (reservationId) => {
    console.log(reservationId)
    await cancelReservationForUser(userEmail, reservationId);
    fetchReservations();
  };

  const fetchReservations = useCallback(async () => {
    const fetchedReservations = await fetchReservationsForUser(userEmail);
    setReservations(fetchedReservations);
  }, [userEmail]);


  const handleInviteEmailChange = (id, value) => {
    setInviteEmail((prevState) => ({ ...prevState, [id]: value }));
  };


  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const upcomingVenueReservations = filterUpcomingReservations(reservations.filter(
    (reservation) => reservation.venue_type === 'venue'
  ));
  const upcomingActivityReservations = filterUpcomingReservations(reservations.filter(
    (reservation) => reservation.venue_type === 'activity'
  ));
  const upcomingEventReservations = filterUpcomingReservations(reservations.filter(
    (reservation) => reservation.venue_type === 'player'
  ));

  const handleReservationClick = (reservation) => {
    setSelectedReservation(reservation.eventDetails);
  };

  const sendInvitation = async (value, reservationId) => {
    console.log(userName, inviteEmail[reservationId], reservationId, value);
    if (inviteEmail && reservationId) {
      await sendInvitationToFriend(userName, inviteEmail[reservationId], reservationId, value);
      setInviteEmail('');
      setShowInviteForm(false);
    }
  };


  const toggleInviteForm = () => {
    setShowInviteForm(!showInviteForm);
  };

  function renderReservationDetails() {
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
            <p><span className="Bold">Given Ratings:</span> {selectedReservation.rating}</p>
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
            <p><span className="Bold">Given Ratings:</span> {selectedReservation.rating}</p>
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

        <button  onClick={() => setSelectedReservation(null)}>Close</button>
      </div>
    );
  }

  return (
    <div className="reservation-history">
      <h2>Upcoming Reservations</h2>
      {upcomingVenueReservations.length > 0 && (
        <>
          <h3>Upcoming Venue Reservations</h3>
          <ul>
            {upcomingVenueReservations.map((reservation, index) => (
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
                <button className="button" onClick={() => handleReservationClick(reservation)}>View Details</button>
                <button className="button" onClick={() => cancelReservation(reservation._id)}>Cancel Reservation</button>
                <button className="button" onClick={toggleInviteForm}>Invite Friend</button>
                {showInviteForm && (
                  <div className="invite-friend-form">
                    <label htmlFor="inviteEmail">Friend's Email:</label>
                    <input
                      type="email"
                      id="inviteEmail"
                      value={inviteEmail[reservation.eventDetails._id] || ''}
                      onChange={(e) => handleInviteEmailChange(reservation.eventDetails._id, e.target.value)}
                    />
                    <button className="button" onClick={() => sendInvitation("event", reservation.eventDetails._id, inviteEmail[reservation.eventDetails._id] || '')}>Send Invitation</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
      {upcomingActivityReservations.length > 0 && (
        <>
          <h3>Upcoming Activity Reservations</h3>
          <ul>
            {upcomingActivityReservations.map((reservation, index) => (
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
                <button className="button" onClick={() => handleReservationClick(reservation)}>View Details</button>
                <button className="button" onClick={() => cancelReservation(reservation._id)}>Cancel Reservation</button>
                <button className="button" onClick={toggleInviteForm}>Invite Friend</button>
                {showInviteForm && (
                  <div className="invite-friend-form">
                    <label htmlFor="inviteEmail">Friend's Email:</label>
                    <input
                      type="email"
                      id="inviteEmail"
                      value={inviteEmail[reservation.eventDetails._id] || ''}
                      onChange={(e) => handleInviteEmailChange(reservation.eventDetails._id, e.target.value)}
                    />
                    <button className="button" onClick={() => sendInvitation("activity", reservation.eventDetails._id, inviteEmail[reservation.eventDetails._id] || '')}>Send Invitation</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
      {upcomingEventReservations.length > 0 && (
        <>
          <h3>Upcoming Player Reservations</h3>
          <ul>
            {upcomingEventReservations.map((reservation, index) => (
              <li key={index}>
                <h4>{reservation.eventDetails.playerSportActivity}</h4>
                <p>{reservation.eventDetails.date?.split('T')[0]} at {reservation.eventDetails?.date?.split('T')[0]}</p>
                <button className="button" onClick={() => handleReservationClick(reservation)}>View Details</button>
                <button className="button" onClick={() => cancelReservation(reservation._id)}>Cancel Reservation</button>
                <button className="button" onClick={toggleInviteForm}>Invite Friend</button>
                {showInviteForm && (
                  <div className="invite-friend-form">
                    <label htmlFor="inviteEmail">Friend's Email:</label>
                    <input
                      type="email"
                      id="inviteEmail"
                      value={inviteEmail[reservation.eventDetails._id] || ''}
                      onChange={(e) => handleInviteEmailChange(reservation.eventDetails._id, e.target.value)}
                    />

                    <button className="button" onClick={() => sendInvitation("player", reservation.eventDetails._id, inviteEmail[reservation.eventDetails._id] || '')}>Send Invitation</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
      {renderReservationDetails()}
      {reservations.length === 0 && (
        <p style={{ color: 'white' }}>No reservations to display.</p>
      )}
    </div>
  );
}

export default UpcomingReservations;
