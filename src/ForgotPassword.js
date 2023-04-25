import React, { useState, useEffect, useRef } from "react";
import './forgot_password.css';
import Modal from './Modal'
import { server_URL } from './keys'

function ForgotPassword() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setColor] = useState("");

  const openModal = (msg,color) => {
    setMessage(msg);
    setColor(color)
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
 
  function sendRequest(URL, data){
    console.log(data);
    return fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    })
    .then(response => response.json())
    .catch(error => {
      openModal('Error: '+error, false);
    });
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = {
      "email": e.target.elements.email.value
    };
    var response = await sendRequest(server_URL+'/users/forgotpassword', JSON.stringify(data));
    openModal(response.message, response.success);
    if(response.success){
      setTimeout(() => {
        window.location.replace('/');
      }, 3000);   
    }
    // call function to send email to user
  };

  return (
    <div className="wrapper" id="section3" style={{textAlign: "center", width: "80%", marginLeft: "10%", marginRight: "10%"}}>
      {isOpen && <Modal isOpen={isOpen} onClose={closeModal} message={message} isSuccess={isSuccess} /> }
      <div className="form form--login">
        <h1 className="alpha">Lost password?</h1>
        <p>Ohk, don't panic. You can recover it here.</p>
        <div>
          <form className="form-wrap" onSubmit={handleFormSubmit}>
            <input id="" className="inputbox email" type="text" placeholder="Email id" name="email" />
            <p><button type="submit" className="button">Send me <i className="icon-rocket"></i></button></p>
          </form>
        </div>
        <hr />
        <p>You remember your Password? Brilliant!</p>
        <p><a className="scroll" href="/login" data-section="1">&laquo; Login here</a></p>
      </div>
    </div>
  );
}

export default ForgotPassword;
