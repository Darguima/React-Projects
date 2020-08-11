import React, { useState } from 'react';

import { monthConverterToNumber } from "../../utils/monthConverter"

import Header from "../Components/Header"
import EventItem from "./Components/EventItem"

import "./styles.css"

import { connect } from "react-redux"

function EventManager({eventManagerData}) {

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	]

	const [daysOfMonth, setDaysOfMonth] = useState([])

	const [inputYear, setInputYear] = useState(eventManagerData.year)
	const [inputMonth, setInputMonth] = useState(eventManagerData.month ? eventManagerData.month : "")
	const [inputDay, setInputDay] = useState(eventManagerData.day ? eventManagerData.day : 0)


	const handleChangeMonthInput = (value) => {
		
		setInputMonth(value)

		const days = new Date(inputYear, monthConverterToNumber(value), 0).getDate()

		const daysArray = []

		for (let day = 1; day <= days; day++){

			daysArray.push(day)

		}

		setDaysOfMonth(daysArray)

	}

	const handleChangeDayInput = (value) => {
		setInputDay(value)
	}

  return (
    <>

    <Header />

		<div id="eventManagerContainer">

			<div id="form">

				<input
					type="number"
					id="yearInput"
					className="input"

					value={inputYear}
					onChange={e => {setInputYear(e.target.value)}}
				/>

				<select
					id="monthInput"
					className="input"

					value={inputMonth}
					onChange={e => {handleChangeMonthInput(e.target.value)}}
				>

				<option value="" hidden >Select a month</option>

					{months.map((item, index) => (
						<option
							key={index}
							value={item}
						>

							{item}

						</option>
					))}

				</select>

				<select
					id="dayInput"
					className="input"

					value={inputDay}
					onChange={e => {handleChangeDayInput(e.target.value)}}
				>

				{ 
					daysOfMonth.length === 0
						?
					<option value="" hidden>Select a month first</option>
						:
					<option value="" hidden >Select a day</option>
				}

				{daysOfMonth.map((item, index) => (
					<option
						key={index}
						value={item}
					>

						{item}

					</option>
				))}

				</select>


			</div>

			<div id="titleContainer">
				<p id="title">Events of {inputYear}-{inputMonth ? inputMonth : 0}-{inputDay}</p>
			</div>

			<main>
				<EventItem />
				<EventItem />
				<EventItem />
				<EventItem />
			</main>

    </div>

    </>
  );
}

export default connect(state => ({eventManagerData: state.eventManager}))(EventManager);