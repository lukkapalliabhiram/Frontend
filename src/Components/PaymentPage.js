import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { fetchClientSecret } from "../api";
import axios from "axios";


const stripePromise = loadStripe("pk_test_51Mn4LdAFfsqlcVQEkmO8NnDi3KWVr6RJ6h225510JcZVN1RbId6WfSFOpaL19Txv8FKm1dCz6S11qnnzQCZzud0A00ArZsNo0T");

function PaymentsPage(user) {
  const navigate = useNavigate();
  const venueIndex = window.location.pathname.split("/").pop();
  const location = useLocation();
  const { venue, bookingTime, venue_type } = location.state;
  const [clientSecret, setClientSecret] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const BASE_URL = "https://backend-4gbl.onrender.com";
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${BASE_URL}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const handlePayment = (paymentMethod) => {
    navigate(`/confirmation/${venueIndex}`, {
      state: { venue, bookingTime, paymentMethod, venue_type },
    });
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };
  const appearance = {
    theme: 'stripe',
    variables: {
      colorText: '#f50000',
    },
  };
  const options = {
    clientSecret,
    appearance,
  };


  return (
    <div className="booking-page">
      <div className="venue-details">
        <h2>{venue.venueName}</h2>
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
          <strong>Description:</strong> {venue.description}
        </div>
        <div>
          <strong>Selected Time Slot:</strong> {bookingTime}
        </div>
        <div>
          <strong>Cost:</strong> {venue.cost}
          <strong>$</strong>
        </div>
        <div>
        {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm user={user} venue={venue} bookingTime={bookingTime} venue_type={venue_type}/>
        </Elements>
      )}
        </div>
        <button onClick={handleBackClick} className="back-button">
          Back
        </button>
      </div>
    </div>
  );
}

export default PaymentsPage;
