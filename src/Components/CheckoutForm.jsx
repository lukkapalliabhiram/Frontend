import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {sendBookingData} from "../api"
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm({user, venue, bookingTime, venue_type}) {
  const BASE_URL = "https://backend-4gbl.onrender.com";
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const userEmail=user.user.email;
  console.log(user);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const venueIndex = window.location.pathname.split("/").pop();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);



  const handleBooking = async (e) => {
    e.preventDefault();
    console.log(venue._id);
    console.log(userEmail);
    console.log(bookingTime);
    const bookingDetails = {
      eventId: venue._id, // Assuming the venue object has an _id property
      userEmail,
      bookingTime,
      venue_type,
    };
    console.log("Booking Data",bookingDetails)
  
    const reservation = await sendBookingData(bookingDetails);
  
    if (reservation) {
      // Show confirmation message
      // TODO: Replace this with a proper confirmation message
      alert('Booking confirmed!');
  
      // Redirect to the payments page
      navigate(`/confirmation/${venueIndex}`, {
        state: { venue, bookingTime},
      });
    } else {
      // Show error message
      // TODO: Replace this with a proper error message
      alert('Failed to store the booking data');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/dashboard",
        receipt_email: email,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }
    if (!error) {
      // If there's no error in the payment, handle the booking
      handleBooking();
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target.value)}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit" onClick={handleBooking}>
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}