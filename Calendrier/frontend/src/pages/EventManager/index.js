import React, { useState } from 'react';

import Header from "../Components/Header"

import "./styles.css"

import { connect } from "react-redux"

function EventManager({eventManagerData}) {

	const [inputDate, setInputDate] = useState(`${eventManagerData.year}-1-1`)

  return (
    <>

    <Header />

		<div id="eventManagerContainer">

			<input
				type="date"
				id="year"

				value={inputDate}
				onChange={e => {setInputDate(e.target.value)}}
			/>

			Events of {inputDate}

    </div>

    </>
  );
}

export default connect(state => ({eventManagerData: state.eventManager}))(EventManager);