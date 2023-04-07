/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import './App.css'
import { server_URL } from './keys'
import Modal from './Modal'
import { Cookies } from 'react-cookie';

function ResetPassword() {
    const cookies = new Cookies();
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [isSuccess, setColor] = useState("");
    const [useremail, setEmail] = useState("");

    const success = cookies.get('success');
    function deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `${name}=; path=/;`;
    }
   
    const openModal = (msg,color) => {
        setMessage(msg);
        setColor(color)
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "./script.js";
        script.async = true;
        script.type = "text/jsx";
        document.body.appendChild(script);
        console.log(cookies.get('success'));
        // navigate('/login');
        if(success==='false'){
            console.log("Cookie not exists");        
            console.log("Redirected");
            window.location.replace('/404');
        }
        else{
            const email = cookies.get('email');
            const decoded_email = decodeURIComponent(email);
            console.log(decoded_email)
            setEmail(decoded_email);
            console.log("Mail-ID:"+useremail);
            // deleteCookie('success');
            // deleteCookie('email');
        }
        return () => {
            document.body.removeChild(script);
        };
    }, []);  

    function convert_JSON(data){
        const jsonFormData = {};
        for (let [key, value] of data.entries()) {
            jsonFormData[key] = value;
        }
        const jsonString = JSON.stringify(jsonFormData);
        return jsonString;
    }

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

    async function handleSignUpSubmit(event) {
        event.preventDefault();
        const form = document.querySelector('#signup_form');
        const data = new FormData(form);
        console.log(data);
        var response = await sendRequest(server_URL+'/users/resetPassword', convert_JSON(data))
        if(response){
            console.log("Data returned!");
            console.log(response);            
            openModal(response.message, response.success);
            if(response.success){
                deleteCookie('success');
                deleteCookie('email');
                setTimeout(() => {
                    window.location.replace('/login');
                  }, 3000);        
            }
        }
    }

  return (
    <>
    <div className="wrapper">

    {isOpen && <Modal isOpen={isOpen} onClose={closeModal} message={message} isSuccess={isSuccess} /> }
      <div className="title-text">
        <div className={`title signup`}>HanabiYuga</div>
      </div>
      <div className="form-container">
        <label htmlFor="login" className={`title signup`}>Reset Password</label>
        <div className="form-inner">
        <form id="signup_form" onSubmit={handleSignUpSubmit} className='signup'>
            <div className="field">
              <input name="password" type="password" placeholder="Password" required />
            </div>
            <div className="field">
              <input name="password2" type="password" placeholder="Confirm password" required />
            </div>
            <input name="email" type="hidden" value={useremail} />
            <br/>          
            {/* <ReCAPTCHA sitekey="6LdI8KckAAAAABmOXJEQHkyWpn2GlW6XzlcYoPyd" onChange={onChange} onLoad={onLoad} ref={captchaRef}/> */}
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value="Reset"  />
            </div>
            </form>
        </div>
      </div>
    </div>
    </>
  );
  
}

export default ResetPassword;