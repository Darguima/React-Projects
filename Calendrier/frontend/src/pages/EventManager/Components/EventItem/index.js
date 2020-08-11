import React from 'react';

import "./styles.css"

function EventItem() {

  const info = {
    name: "Family Dinner",
    month: "Juny",
    day: 4,
    year: 2020,
    time: "21:00",
    description: "oi"
  }

  return (

    <div id="eventItemContainer">

      <div id="title">
        <p>{info.name}</p>
      </div>

      <div id="timeGrid">

        <div id="month" className="timeBlock">
          <p className="top">Month</p>
          <p className="bottom">{info.month}</p>
        </div>

        <div id="day" className="timeBlock">
          <p className="top">Day</p>
          <p className="bottom">{info.day}</p>
        </div>

        <div id="year" className="timeBlock">
          <p className="top">Year</p>
          <p className="bottom">{info.year}</p>
        </div>

        <div id="time" className="timeBlock">
          <p className="top">Time</p>
          <p className="bottom">{info.time}</p>
        </div>

      </div>

      <div id="description">
          <p className="top">Description</p>
          <p className="bottom">{info.description}</p>
      </div>


      <div id="deleteButtonContainer">
        <button id="deleteButton" >
          Delete Event
        </button>
      </div>

    </div>

  );
}

export default EventItem;