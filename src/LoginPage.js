/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { server_URL } from './keys'
import Modal from './Modal'
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import "./LoginPage.css";

function LoginPage() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setColor] = useState("");
  const [mobilenum, setInputValue] = useState("");

  const openModal = (msg,color) => {
    setMessage(msg);
    setColor(color)
    setIsOpen(true);
  };
  

  const closeModal = () => {
    setIsOpen(false);
  };
  
  const captchaRef = useRef(null)
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "./script.js";
    script.async = true;
    script.type = "text/jsx";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);  

  const [slide, setSlide] = useState('login');

  function handleSlideChange(e)
  {
    setSlide(e.target.id);
  }
  
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
  // Google Auth login and token verification
  // start
  const onSuccess = (response) => {
    console.log(response)
    var decode = jwt_decode(response.credential)
    sendGoogleUserDetails(decode);
  };

  const onError = (error) => {
    console.log('Login Failed:', error);
    openModal('Error: '+error, false);
  };

  async function sendGoogleUserDetails(user){
    console.log(user);
    var send_data = {};
    send_data.email = user.email;
    send_data.picture = user.picture;
    var response = await sendRequest(server_URL+'/users/googleSignIn', JSON.stringify(send_data));
    console.log(response.profile);
    if(response){
      openModal(response.message, response.success);
      if(response.profile){
        const expires = new Date(Date.now() + 1 * 1 * 60 * 60 * 1000);
        cookies.set('session', response.profile, { expires });
        navigate('/');
      }
    } 
  }
  // Stop

  async function handleLoginSubmit(event) {
    event.preventDefault();
    const form = document.querySelector('#login_form');
    const data = new FormData(form);
    console.log("Recaptcha Token :"+data.get('g-recaptcha-response'));
    if(data.get('g-recaptcha-response')===''){
      openModal("You forgot to complete the captcha");
    }
    else{
      var response = await sendRequest(server_URL+'/users/login', convert_JSON(data));
      openModal(response.message, response.success);
      if(response.profile){
        const expires = new Date(Date.now() + 1 * 1 * 60 * 60 * 1000);
        cookies.set('session', response.profile, { expires });
        window.location.replace('/');
      }
    }
  }

  async function handleSignUpSubmit(event) {
    event.preventDefault();
    const form = document.querySelector('#signup_form');
    const data = new FormData(form);
    console.log(data);
    console.log('signup');
    var response = await sendRequest(server_URL+'/users/signup', convert_JSON(data))
    if(response){
      console.log("Data returned!");
      console.log(response);            
      openModal(response.message, response.success);  
      window.location.replace('/login');
    }
  }


  
  function handleKeyDown(event) {
    if (!/^[0-9]+$/.test(event.key) && // disallow non-numeric characters
    event.key !== "Backspace" && // allow backspace key
    event.key !== "Delete" && // allow delete key
    event.key !== "ArrowLeft" && // allow left arrow key
    event.key !== "ArrowRight") {
      event.preventDefault();
    }
  }

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }
  
  const [topping, setTopping] = useState(" * Choose Role Please * ");
  const [role_type, setrole_type] = useState(-1);

  const onOptionChange = e => {
    setTopping(e.target.value)
    if(e.target.value==="Owner"){
      setrole_type(1);
    }
    else{
      setrole_type(0);
    }
  };

  const onLoad = () => {
    console.log("reCAPTCHA loaded");
  };
  
  const onChange = (value) => {
    console.log("reCAPTCHA value:", value);
  };

  return (
    <>
    <div className="wrapper">
      <style>
        {`
          *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Montserrat';
          }
          html,body{
            /* display: grid;
            height: 100%;
            width: 100%;
            place-items: center;
            background: -webkit-linear-gradient(left, #003366,#004080,#0059b3
          , #0073e6); */
            display: flex;
            padding: 0;
            margin: 0;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100vh;
            /* background-color:rgb(52, 86, 130);*/
            background-size: cover;
          }
          input[type="radio"]{
            display: none;
          }
        `}
      </style>
    {isOpen && <Modal isOpen={isOpen} onClose={closeModal} message={message} isSuccess={isSuccess} /> }
      <div className="title-text">
        <div className={`title ${slide}`}>HanabiYuga Welcomes You</div>
      </div>
      <div className="form-container">
        <div className="slide-controls">
          <input type="radio" name="slide" id="login" checked={slide === 'login'} onChange={handleSlideChange} />
          <input type="radio" name="slide" id="signup" checked={slide === 'signup'} onChange={handleSlideChange} />
          <label htmlFor="login" className={`slide ${slide}`}>Login</label>
          <label htmlFor="signup" className={`slide ${slide === 'login' ? 'signup' : 'login'}`}>Signup</label>
          <div className="slider-tab"></div>
        </div>
        <div className="form-inner">
        { slide === 'signup' && <form id="signup_form" onSubmit={handleSignUpSubmit} className={`${slide}`}>         
            <div className="field">
              <input name="fname" type="text" placeholder="First Name" required />
            </div>
            <div className="field">
              <input name="lname" type="text" placeholder="Last Name" required />
            </div>
            <div className="field">
              <input name="email" type="email" placeholder="Email Address" required />
            </div>
            <div className="field">
              <input name="password" type="password" placeholder="Password" required />
            </div>
            <div className="field">
              <input name="password2" type="password" placeholder="Confirm password" required />
            </div>
            <div className="field">
              <input name="number" type="text" placeholder="Mobile number" value={mobilenum} maxLength={10} minLength={10}  onKeyDown={handleKeyDown} onChange={handleInputChange} required />
            </div>

            <br/>
            <div className="LoginForm">
              <h3>Click Your Role</h3>
              <br/>
              <input
                type="radio"
                name="role_user"
                value="User"
                id="Customer/User"
                checked={topping === "Customer/User"}
                onChange={onOptionChange}
                required=""
              />
              <label htmlFor="Customer/User">Customer/User</label>

              <span style={{ margin: '0 50px' }}></span>
              <input
                type="radio"
                name="role_owner"
                value="Owner"
                id="Host/Owner"
                checked={topping === "Host/Owner"}
                onChange={onOptionChange}
                required=""
              />
              <label htmlFor="Host/Owner">Host/Owner</label>
              <input name="role" type="hidden" value={role_type} />
              <br/>
              <br/>
              <p>
                You selected:  <strong>{topping}</strong>
              </p>
            </div>            
            {/* <ReCAPTCHA sitekey="6LdI8KckAAAAABmOXJEQHkyWpn2GlW6XzlcYoPyd" onChange={onChange} onLoad={onLoad} ref={captchaRef}/> */}
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value={slide === 'login' ? 'Login' : 'Signup'} />
            </div>
            </form>}
            { slide === 'login' && <form onSubmit={handleLoginSubmit} id="login_form" className={`${slide}`}>  
            <div className="field">
              <input name="email" type="email" placeholder="Email Address" required />
            </div>
            <div className="field">
              <input name="password" type="password" placeholder="Password" required />
            </div>
            <div className="pass-link">
              
            </div>
            <br />
            <div>
              <center>
                <ReCAPTCHA sitekey="6LcR_rUlAAAAAPMZVzzvZhTAopMjsxzIr8Spgg33" onChange={onChange} onLoad={onLoad} ref={captchaRef}/>
              </center>
            </div>
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value={slide === 'login' ? 'Login' : 'Signup'} />
            </div>
            <div className="signup-link"><a href="/forgotPassword">Forgot password?</a>
            <br /> <br />
              <div className="google_button">
                <center>
              <GoogleLogin onSuccess={onSuccess} onError={onError} useOneTap="false" cookiePolicy/>
                </center>
              </div>
              <br />
            </div>
          </form>}
        </div>
      </div>
    </div>
    </>
  );
  
}

export default LoginPage;