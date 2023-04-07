import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Cookies } from 'react-cookie';

function Message() {
  const location = useLocation();
  const cookies = new Cookies();
  const url = new URLSearchParams(location.search).get('url');
  const success = new URLSearchParams(location.search).get('success');
  if(success==='1'){
    const email = new URLSearchParams(location.search).get('email');
    cookies.set('success', true);
    cookies.set('email', email);
  }
  else{
    const message = new URLSearchParams(location.search).get('msg');
    cookies.set('message', {message});
    cookies.set('success', false);
  }
  window.location.replace(url);

  return (
    <div style={{ color: 'white' }}>
        <center><h1>404</h1></center>
    </div>
  );
}

export default Message;