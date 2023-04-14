import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Reservation from "./Components/reservation_history";
import UpReservation from "./Components/upcoming_reservation";
import FilterSearch from "./Components/Filter_Search";
import PaymentsPage from "./Components/PaymentPage";
import BookingPage from "./Components/booking_page";
import ActivityDetails from "./Components/Activity_details";
import PlayerDetailsPage from "./Components/Player_details";
import ConfirmationPage from "./Components/ConfirmationPage";
import Footer from "./footer";
import { fetchVenues, fetchActivities, fetchPlayers } from "./api";
import { fetchUser } from "./api1";
import Dashboard from './Dashboard';
import LoginPage from './LoginPage';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import NotFound from './NotFound';
import Message from './Message';
import { Cookies } from 'react-cookie';
import { useCookies } from 'react-cookie';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./Components/CheckoutForm";
import SendbirdApp from "@sendbird/uikit-react/App";
import "@sendbird/uikit-react/dist/index.css";
import VenueDetails from "./Components/venue_details";
import VenueDetails2 from "./Components/venue_details2";
import VenueDetails3 from "./Components/venue_details3";
const cookies = new Cookies();
const stripePromise = loadStripe("pk_test_51Mn4LdAFfsqlcVQEkmO8NnDi3KWVr6RJ6h225510JcZVN1RbId6WfSFOpaL19Txv8FKm1dCz6S11qnnzQCZzud0A00ArZsNo0T");


function App() {
  const [filteredData, setFilteredData] = useState([]);
  const [clientSecret, setClientSecret] = useState("");
  const [user, setUser] = useState([]);
  const BASE_URL = "https://backend-4gbl.onrender.com";
  const [data, setData] = useState([]);

  useEffect(() => {
    loadTheme();
    fetchVenues().then((venues) => setData(venues));
    fetchActivities().then((activities) => setData((prevData) => [...prevData, ...activities]));
    fetchPlayers().then((players) => setData((prevData) => [...prevData, ...players]));
    const session = cookies.get('session');
    if (session) {
      setUser(session);
    }
    fetch(`${BASE_URL}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [cookies]);

  const appearance = {
    theme: 'night',
    variables: {
      colorBackground: '#000000',
      colorText: '#f5f5f5',
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeToApply = savedTheme ? savedTheme : 'light'; // Default to light mode if no preference is saved
    document.documentElement.setAttribute('data-theme', themeToApply);
  }

  return (
    <Router>
      <div className="App">
        <AppRoutes clientSecret={clientSecret} options={options} data={data} />
        <Routes>
        <Route path="/filter_search" element={<FilterSearch  user={user} data={data}/>} />
        <Route path="/chat" element={<div className="App">
            <SendbirdApp
                // Add the two lines below.
                appId="4D55419E-3D2A-43BB-A712-2E7B1DCF27AB"   // Specify your Sendbird application ID.
                userId={user.email}        // Specify your user ID.
                nickname={user.name}
            />
        </div>} />
        <Route path="/book_venue/:venueIndex" element={<BookingPage data={data} user={user} />} />
        <Route path="/activity_details/:activityIndex" element={<ActivityDetails data={data} />} />
        <Route path="/player_details/:playerIndex" element={<PlayerDetailsPage data={data} />} />
        <Route path="/payments/:venueIndex" element={<PaymentsPage user={user} />} />
        <Route path="/payments/:activityIndex" element={clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )} />
        <Route path="/payments/:playerIndex" element={<PaymentsPage />} />
        <Route path="/confirmation/:venueIndex" element={<ConfirmationPage />} />
        <Route path="/my_reservations" element={<Reservation user={user} />} />
        <Route path="/invitation/venue/:venueId" element={<VenueDetails />} />
        <Route path="/invitation/activity/:venueId" element={<VenueDetails2 />} />
        <Route path="/invitation/player/:venueId" element={<VenueDetails3 />} />
        </Routes>
      </div>
      
    </Router>
  );
}


function AppRoutes(clientSecret, options, data, handleFilterSearch) {
  const location = useLocation();
  const user = useCookies(['session'])[0].session || [];

  const shouldHideHeader = location.pathname === '/login';

  return (
    <>
      {!shouldHideHeader && <Header user={user} />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Home data={data} user={user} />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/Message" element={<Message />} />
        <Route path="/404" element={<NotFound />} />
        
      </Routes>
    </>

  );
}

function Home({ user }) {
  return (
    <main>
      <section className="profile">
        <Reservation user={user}/>
        <UpReservation user={user}/>
        <Footer />
      </section>
    </main>
  );
}


function Login({ data, reservations }) {
  return (
    <main>
      <section className="profile">
        <LoginPage />
      </section>
    </main>
  );
}


export default App;