import React, { useEffect } from "react";
// import "../css/bootstrap.min.css";
import styles from "../css/card.module.css";
import { client_URL, imgURL } from '../keys';
var props = {
  activityName : 'ABC',
  image: 'http:/',
}

function activity (p){
  if(p){        
    props = p;
  } 
  return (
    <div className={styles.card} style={{cursor:'pointer'}}>
      <div>
        {props.image.startsWith('http') ? (
        <img src={props.image} alt="Venue" className={styles.cardImage} />
        ) : (
          <img src={`${imgURL}/${props.image}`} alt="Venue" className={styles.cardImage} />
        )}
      </div>
      <div className={styles.cardHeader} >
        {props.activityName}        
      </div>
    </div>
  );
}

export default activity;
