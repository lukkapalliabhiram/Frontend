import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../css/card.module.css";
import { server_URL, imgURL } from '../keys';
import { Toast, ToastContainer } from 'react-bootstrap';
import TimePicker from 'react-bootstrap-time-picker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


var props = {
    activityName : 'ABC',
    image: 'img/venue.jpg',
    location : 'ABC',
    description : 'ABC',
    ageRange : 'ABC',
    availableTimeSlots: [],
    facilities: [],
    occupied: 'ABC',
    maxCapacity: 'ABC',
    rating: 'ABC',
    cost: 'ABC'
  }  

  const ShowModal = (p) => {    
    const [showToast, setShowToast] = useState(false);
    const [showMessage, setShowMessage] = useState("");
    const [input, setInput] = useState('');
    const [tags, setTags] = useState([]);
    const [isKeyReleased, setIsKeyReleased] = useState(false);
    const [time, setTime] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);
    const [fromTime, setFromTime] = useState();
    const [toTime, setToTime] = useState();
    const [date, setDate] = useState(new Date());
    const [imageURL, setImageURL] = useState("");
    const [fileName, setFileName] = useState('');
    const [eventID, setEventID] = useState('');

    const handleImageUpload = async (event) => {
        event.preventDefault();
        const link = prompt("Enter image URL link here");
        console.log(link);
        setImageURL(link);
        setFileName(link);
    };


    const handleFromTimeChange = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const suffix = hours < 12 ? 'AM' : 'PM';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedTime = `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${suffix}`;
        console.log(formattedTime); // "04:30 PM"
        setFromTime(formattedTime);
    };

    function convert_date(d){
        console.log(Date(d))
        const formattedDate = new Date(d);
        return formattedDate;
    }

    const handleToTimeChange = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const suffix = hours < 12 ? 'AM' : 'PM';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedTime = `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${suffix}`;
        console.log(formattedTime); // "04:30 PM"
        setToTime(formattedTime);
    };


    const onChange = (e) => {
        const { value } = e.target;
        setInput(value);
    };

    const onKeyDown = (e) => { 
        const { key } = e;
        const trimmedInput = input.trim();
        
      
        if (key === 'Enter' && trimmedInput.length && !tags.includes(trimmedInput)) {
          e.preventDefault();
          setTags(prevState => [...prevState, trimmedInput]);
          setInput('');
        }
      
        if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
          const tagsCopy = [...tags];
          const poppedTag = tagsCopy.pop();
          e.preventDefault();
          setTags(tagsCopy);
          setInput(poppedTag);
        }
      
        setIsKeyReleased(false);
        // e.preventDefault();
    };
      
    const onKeyUp = (e) => {
        setIsKeyReleased(true);
        // e.preventDefault();
    }

    const deleteTag = (index) => {
        setTags(prevState => prevState.filter((tag, i) => i !== index))
    }

    const handleAddSlot = (event) => {
        event.preventDefault();
        // const fromTime = document.getElementById('starttime').value;
        console.log(fromTime);
        // const toTime = document.getElementById('endtime').value;
        console.log(toTime);
        if(fromTime===undefined){
            alert('Start Time is not changed');
        }
        else{
            if(toTime===undefined){
                alert('End Time is not changed');
            }
            else{
                const currentDate = new Date();
                const startDateTime = new Date(currentDate);
                const endDateTime = new Date(currentDate);

                const [startHour, startMinute] = fromTime.split(":");
                startDateTime.setHours(parseInt(startHour));
                startDateTime.setMinutes(parseInt(startMinute));

                const [endHour, endMinute] = toTime.split(":");
                endDateTime.setHours(parseInt(endHour));
                endDateTime.setMinutes(parseInt(endMinute));

                if (startDateTime.getTime() > endDateTime.getTime()) {
                    alert("Start time cannot be after end time");
                } 
                else if ( startDateTime.getHours() === 0 && startDateTime.getMinutes() === 0) {
                    alert("Start time cannot be 12:00 AM");
                }
                else if ( startDateTime.getHours() === endDateTime.getHours() && startDateTime.getMinutes() ===  endDateTime.getMinutes()) {
                    alert("Start Time cannot be same as End Time");
                } 
                else {                    
                    const trimmedInput = fromTime + '-' + toTime;
                    if (trimmedInput.length && !timeSlots.includes(trimmedInput)) {
                        setTimeSlots(prevState => [...prevState, trimmedInput]);
                        setFromTime();
                        setToTime();
                    }
                }
            }
        }
        
        
    }; 

    const handleDeleteSlot = (index) => {
        setTimeSlots(prevState => prevState.filter((time, i) => i !== index));
    };

    async function deleteActivity(p) {
        const confirmed = window.confirm(`Are you sure you want to delete ${p.activityName}?`);
        if (confirmed) { 
            try {
                console.log(p._id);
                const response = await fetch(server_URL+'/owners/deleteActivity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: p._id, owneremail: p.activityCreatedBy})
                }).then(async (response)=>{
                    const jsonData = await response.json()
                    console.log(jsonData);

                    if(jsonData.message){
                        document.getElementById('activityModal').style.display = 'none';
                        console.log(jsonData.message);
                        setShowToast(jsonData.success);
                        setShowMessage(jsonData.message);
                        setTimeout(() => {
                            window.location.reload();
                        }, 1500);
                    }
                });               
            } catch (error) {
                console.log('Error: ' + error, false);
                return null;
            }
        }        
    }

    function editActivity(p){
        console.log("Edit Activity");
        setTags(props.facilities);
        setTimeSlots(props.availableTimeSlots);
        setDate(convert_date(props.date));
        if(props.image.startsWith('http')){            
            setImageURL(props.image);
        }
        else{
            setImageURL(imgURL+'/'+props.image);
        }
        console.log("IMage URL");
        console.log(imageURL);
        console.log(props.activityLocation)
        setFileName(props.image);
        setEventID(props._id);
        document.getElementById('activityName').value = props.activityName;
        document.getElementById('location').value = props.activityLocation;
        document.getElementById('ageRange').value = props.ageRange;
        document.getElementById('description').value = props.description;
        document.getElementById('maxCapacity').value = parseFloat(props.maxCapacity);
        document.getElementById('cost').value = parseFloat(props.cost);
        document.getElementById('activityModal').style.display = 'none';
        document.getElementById('editActivityModal').style.display = 'block';
    }

    async function updateActivity(event){
        event.preventDefault();
        const form = document.querySelector('#activity_form');
        // console.log(form);
        const data = new FormData(form);
        data.append('facilities',JSON.stringify(tags));
        data.append('availableTimeSlots',JSON.stringify(timeSlots));
        const ogdate = new Date(date);
        const isoDate = ogdate.toISOString();
        data.append('date',isoDate);
        data.append('image',fileName);
        data.append('eventID',eventID);        
        
        const response = await fetch(server_URL+'/owners/updateActivity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: convert_JSON(data)
        })
        .then(async (response)=>{
            const jsonData = await response.json();
            console.log(jsonData);
            if(jsonData.message){
                document.getElementById('activityModal').style.display = 'none';
                console.log(jsonData.message);
                setShowToast(jsonData.success);
                setShowMessage(jsonData.message);
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        })
        .catch(error => {
            console.log('Error: ' + error, false);
            return null;
        });
    }
        

    function convert_JSON(data){
        const jsonFormData = {};
          for (let [key, value] of data.entries()) {
            jsonFormData[key] = value;
          }
          const jsonString = JSON.stringify(jsonFormData);
          return jsonString;
      }
    

    if(p.activityName){        
        props = p;
        console.log(props);
        return (
            <>
            <ToastContainer position="top-end">
                <Toast show={showToast} onClose={() => setShowToast(false)}>
                    <Toast.Body></Toast.Body>
                </Toast>
            </ToastContainer>

            <ToastContainer position="top-end">
                <Toast show={showToast} onClose={() => setShowToast(false)} style={{backgroundColor: 'green', color: 'white'}} >
                    <Toast.Header>
                    <strong className="me-auto">Message</strong>
                    <small>Just now</small>
                    </Toast.Header>
                    <Toast.Body>{showMessage}</Toast.Body>
                </Toast>
            </ToastContainer>


            <div className="modal-overlay">
                <div id="activityModal" className="modal" style={{display : 'block'}}>                
                    <div className="modal-content" style={{padding: '0', overflowY: 'auto', marginTop: '10%', maxWidth : '500px'}}>                        
                    <div className={styles.card} style={{marginLeft: '0%', marginRight: '0%', marginTop: '0%'}}>
                        <div className={styles.cardBody} style={{padding : '0', marginTop : '0'}}>                                                    
                        <div className={styles.imageContainer}>
                            <button className={styles.closeBtn} onClick={() => {document.getElementById('activityModal').style.display = 'none'}}>
                                X
                            </button> 
                            <img src={props.image} alt="Activity" className={styles.cardImage} />
                        </div>
                        <h5 className={styles.cardHeader} style={{marginLeft: '1%', marginRight: '1%'}}>{props.activityName}</h5>
                        <ul style={{marginLeft: '1%', marginRight: '1%'}}>
                            <li className={styles.listItem}><strong>Location:</strong> {props.activityLocation}</li>
                            <li className={styles.listItem}><strong>Description:</strong></li>
                            <li className={styles.listItem}>{props.description}</li> 
                            <li className={styles.listItem}><strong>Age Range:</strong> {props.ageRange}</li>
                            <li className={styles.listItem}>
                            <strong>Available Time Slots:</strong>
                            <ul>
                                {props.availableTimeSlots.map(item => (
                                <li className={styles.listItem}>{item}</li>
                                ))}
                            </ul>
                            </li>
                            <li className={styles.listItem}>
                            <strong>Available Facilities:</strong>
                            <ul>
                                {props.facilities.map(item => (
                                <li className={styles.listItem}>{item}</li>
                                ))}
                            </ul>
                            </li>          
                            <li className={styles.listItem}><strong>Seats Availability:</strong> {props.occupied} / {props.maxCapacity}</li>
                            <li className={styles.listItem}><strong>Rating: {props.rating} </strong></li>
                            <li className={styles.listItem}><strong>Cost: {props.cost}</strong></li>
                        </ul>
                        <button className="btn btn-primary" style={{backgroundColor: 'green', borderColor: 'green', margin: '2%', cursor: 'pointer'}} onClick={() => editActivity(p)}>
                            Edit
                        </button>
                        <button className="btn btn-primary" style={{backgroundColor: 'red', borderColor: 'red', margin: '2%', cursor: 'pointer'}} onClick={() => deleteActivity(p)}>
                            Delete
                        </button>
                        <button className="btn btn-primary" style={{backgroundColor: '#08102a', borderColor: '#08102a', cursor: 'pointer', width: '15%'}} onClick={() => {document.getElementById('activityModal').style.display = 'none'}} >
                            Close
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                {/* Edit modal */}
                <div id="editActivityModal" className="modal" style={{display : 'none'}}>                
                    <div className="modal-content" style={{padding: '0', overflowY: 'auto', marginTop: '15%', maxWidth : '600px'}}>                        
                    <div className={styles.card} style={{marginLeft: '0%', marginRight: '0%', marginTop: '0%'}}>
                        <div className={styles.cardBody} style={{padding : '0', marginTop : '0'}}>
                        <form className="form-inline" id="activity_form" >
                            <div className="row">
                                <div className={styles.imageContainer}>
                                    <button className={styles.closeBtn} onClick={() => {document.getElementById('editActivityModal').style.display = 'none'}}>
                                        X
                                    </button>
                                    <img className={styles.cardImage} src={imageURL} alt="Activity"/>
                                    <div className={styles.uploadBtnContainer} onClick={handleImageUpload}>
                                        <label htmlFor="uploadImage" className={styles.uploadBtn}>
                                        Upload Image
                                        </label>
                                        <input type="text" name="image" value={imageURL} id="uploadImage" style={{display: 'none'}} />
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{margin: '2%'}}>
                                <div className="col-md-6" >
                                    <label htmlFor="email"><strong>Activity Name:</strong></label>
                                    <input type="text" className="form-control" name="activityName" id="activityName" style={{textAlign: 'center'}} />
                                </div>
                                <div className="col-md-6" >
                                    <label htmlFor="email"><strong>Location:</strong></label>
                                    <input type="text" className="form-control" name="location" id="location" style={{textAlign: 'center'}} />
                                </div>
                            </div>
                            <div className="row" style={{margin: '2%'}}>
                                <div className="col-md-12">
                                    <label htmlFor="email"><strong>Description:</strong></label>
                                    <textarea className="form-control" name="description" id="description" rows={'1'} />
                                </div>
                            </div>
                            <div className="row" style={{margin: '2%'}}>
                                <div className="col-md-6" >
                                    <label htmlFor="email"><strong>Age Range</strong></label>
                                    <input type="text" className="form-control" name="ageRange" id="ageRange" style={{textAlign: 'center'}} />
                                </div>
                                <div className="col-md-6" >
                                    <label htmlFor="email"><strong>Capacity:</strong></label>
                                    <input type="number" className="form-control" name="maxCapacity" id="maxCapacity" style={{textAlign: 'center'}} />
                                </div>
                            </div>
                            <div className="row" style={{margin: '2%'}}>
                                <div className="col-md-12" >
                                    <label htmlFor="email"><strong>Facilities</strong></label>
                                    <div style={{marginTop: '2%', marginBottom: '2%', marginLeft: '5%', marginRight: '5%'}}>
                                        <input
                                            className="form-control"
                                            value={input}
                                            placeholder="Enter a Facility"
                                            onKeyDown={onKeyDown}
                                            onKeyUp={onKeyUp}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div className={styles.container}>
                                        {tags.map((tag, index) => (
                                            <div className={styles.tag}>
                                                {tag}
                                                <button onClick={() => deleteTag(index)}>x</button>
                                            </div>
                                        ))}                                        
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{margin: '2%'}}>
                                <div className="col-md-6" >
                                    <label htmlFor="email"><strong>Cost</strong></label>
                                    <input type="number" className="form-control" name="cost" id="cost" style={{textAlign: 'center'}} />
                                </div>
                                <div className="col-md-6" >
                                    <label htmlFor="email"><strong>Date</strong></label>
                                    <DatePicker
                                        selected={date}
                                        onChange={(date) => setDate(date)}
                                        dateFormat="dd/MM/yyyy"
                                        style={{textAlign: 'center'}}
                                    />
                                </div>
                            </div>
                            <div className="row" style={{margin: '2%'}}>
                                <div className="col-md-12" >
                                    <label htmlFor="email"><strong>Time Slots</strong></label>
                                    <div className="row" >
                                        <div className="col-md-5">
                                            <label htmlFor="email"><strong>Start Time:</strong></label>
                                            <TimePicker
                                                id="starttime"
                                                value={fromTime}
                                                step={30}
                                                minTime={null}
                                                maxTime={toTime}
                                                onChange={handleFromTimeChange}
                                            />
                                        </div>
                                        <div className="col-md-5">
                                            <label htmlFor="email"><strong>End Time:</strong></label>
                                            <TimePicker
                                                id="endtime"
                                                step={30}
                                                value={toTime}
                                                minTime={fromTime}
                                                maxTime={null}
                                                onChange={handleToTimeChange}
                                            />
                                        </div>
                                        <div className="col-md-2" style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                            <label htmlFor="email"></label>
                                            <button className="btn btn-primary" style={{alignSelf: "center", backgroundColor: '#051d40', borderColor: '#051d40'}} onClick={handleAddSlot}>Add</button>
                                        </div>
                                    </div>
                                    <div className={styles.container} style={{margin: '2%'}}>
                                        {timeSlots.map((tag, index) => (
                                            <div className={styles.tag}>
                                                {tag}
                                                <button onClick={() => handleDeleteSlot(index)}>x</button>
                                            </div>
                                        ))}
                                    </div>                                    
                                </div>
                            </div>
                            <div className="row">
                                <center>
                                    <button className="btn btn-primary" style={{backgroundColor: '#08102a', borderColor: '#08102a', cursor: 'pointer', width: '20%', margin:'5%'}} onClick={updateActivity}>
                                        Update
                                    </button>
                                    <button className="btn btn-primary" style={{backgroundColor: '#08102a', borderColor: '#08102a', cursor: 'pointer', width: '15%', margin:'5%'}} onClick={() => {document.getElementById('editActivityModal').style.display = 'none'}} >
                                        Close
                                    </button>
                                </center>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            </>

        )   
    } else {
        return null;
    }
}

export default  ShowModal;
