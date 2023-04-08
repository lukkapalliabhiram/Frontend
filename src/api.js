import axios from "axios";

const BASE_URL = "https://backend-4gbl.onrender.com";

export const fetchVenues = async () => {
  const response = await axios.get(`${BASE_URL}/venues`);
  return response.data;
};

export const fetchActivities = async () => {
  const response = await axios.get(`${BASE_URL}/activities`);
  return response.data;
};

export const fetchPlayers = async () => {
  const response = await axios.get(`${BASE_URL}/players`);
  return response.data;
};

export const sendBookingData = async (bookingDetails) => {
  try {
    const response = await fetch(`${BASE_URL}/api/reservations/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingDetails),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to store the booking data');
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};


export const fetchClientSecret = async (paymentData) => {
  try {
    const response = await axios.fetch(`${BASE_URL}/api/create-payment-intent`, paymentData);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch the client secret");
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};


// api.js
export const fetchReservationsForUser = async (userEmail) => {
  try {
    const response = await fetch(`${BASE_URL}/api/reservations/user/${userEmail}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to fetch reservations for user');
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};


export async function cancelReservationForUser(userEmail, reservationId) {
  const response = await fetch(`${BASE_URL}/api/reservations/cancel/${reservationId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userEmail }),
  });

  if (!response.ok) {
    throw new Error('Failed to cancel reservation');
  }
}


export async function updateReservationRating(reservationId, rating) {
  const response = await fetch(`${BASE_URL}/api/reservation/rating/${reservationId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rating }),
  });

  if (!response.ok) {
    throw new Error('Error updating reservation rating');
  }

  return await response.json();
}
