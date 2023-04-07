/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
const cookies = new Cookies();


function Dashboard() {
    const navigate = useNavigate();
    console.log(cookies.get('session'));
    const session = cookies.get('session');
    // navigate('/login');
    if(!session || !session.login){
        console.log("Cookie not exists");        
        console.log("Redirected");
        window.location.replace('/login');
    }
    else{
        console.log("Cookie exists");
        navigate('/dashboard');
    }
 
    return (
    <>
    <div/>
    </>
    );
  
}

export default Dashboard;