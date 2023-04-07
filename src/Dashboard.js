import React, { useState, useEffect, useRef } from "react";
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
const cookies = new Cookies();

function Dashboard() {
    const navigate = useNavigate();
    const session = cookies.get('session');

    useEffect(() => {
        if (!session || !session.login) {
            console.log("Cookie not exists");
            console.log("Redirected");
            navigate('/login');
        } else {
            console.log("Cookie exists");
            navigate('/dashboard');
        }
    }, [navigate, session]);

    return (
        <>
            <div />
        </>
    );
}

export default Dashboard;
