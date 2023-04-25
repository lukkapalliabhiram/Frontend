import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { server_URL } from '../keys'
import venue from './Venue'
import ShowModal from './VenueModal'
import 'bootstrap/dist/css/bootstrap.min.css';
import AddModal from './VenueAddModal'

function VenueDetails ({ user }) {   
  const [venues, setVenues] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [curritem, setCurrItem] = useState({});
  const [showDiv, setShowDiv] = useState(false);

  function handleModalOpen(index) {
    setCurrItem(curritem =>venues[index]);
    document.getElementById('venueModal').style.display = 'block';
  }

  function openAddModal() {
    console.log("Open Add Modal");
    document.getElementById('addVenueModal').style.display = 'block';
  }

  useEffect(() => {
    
    const sendRequest = async () => {
      try {
        console.log(user);
        const response = await fetch(server_URL+'/owners/getVenues', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email: user.email})
        });
        const jsonData = await response.json();
        // console.log(typeof jsonData);        
        setVenues(JSON.parse(jsonData));                
      } catch (error) {
        console.log('Error: ' + error, false);
      }
    }
    sendRequest();
  }, [user.email]);
  return (
    <>      
      {ShowModal(curritem)}
      {showDiv && (
      <AddModal/>      
      )}
      <div className="row justify-content-end">
        <div className="col-auto" style={{marginRight: '2%'}}>
          <button className="btn btn-primary" style={{backgroundColor: '#7c3e58', borderColor: '#7c3e58', margin: '1%'}} onClick={()=>{setShowDiv(true)}}>
            Add Venue
          </button>
        </div>
      </div>
      <div className="row">
        {venues.map((item, index) => (
            // Render each item as a list item with a unique key
          <div key={item.id} className="col-lg-4 col-md-6 col-12 wow fadeInUp" onClick={() => handleModalOpen(index)}>
            {venue(item)}
          </div>   
        ))}        
      </div>
    </>
  );
};

export default VenueDetails;
