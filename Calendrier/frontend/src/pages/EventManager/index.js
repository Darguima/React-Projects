import React, { useState, useEffect, useCallback } from 'react';
import { useRouteMatch } from "react-router-dom"

import { monthConverterToNumber } from "../../utils/monthConverter"
import convertHourToMinutes from "../../utils/convertHourToMinutes"

import Header from "../Components/Header"
import EventItem from "./Components/EventItem"

import { connect } from "react-redux"

import calendrierApi from "../../services/calendrierApi"

import "./styles.css"

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
	const [inputDay, setInputDay] = useState(eventManagerData.day ? Number(eventManagerData.day) : 0)

	useEffect(() => {
		if (inputDay !== 0){
			const days = new Date(inputYear, monthConverterToNumber(inputMonth), 0).getDate()
			const daysArray = []

			for (let day = 1; day <= days; day++){

				daysArray.push(day)
			}


			setDaysOfMonth(daysArray)
		}
	
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])


	const handleChangeYearInput = (value) => {
		if (value)
			setInputYear(Number(value))
	}

	const handleChangeMonthInput = (value) => {
		
		setInputMonth(value)

		let days = 0


		if (value !== ""){

			days = new Date(inputYear, monthConverterToNumber(value), 0).getDate()
		
		}

		const daysArray = []

		for (let day = 1; day <= days; day++){

			daysArray.push(day)
		}


		setDaysOfMonth(daysArray)

	}

	const handleChangeDayInput = (value) => {
		value !== "" ? setInputDay(Number(value)) : setInputDay(0)
	}

	const [userId] = useState(useRouteMatch().params.userId)
	const [userInfo, setUserInfo] = useState([])
	const [eventsToBeListed, setEventsToBeListed] = useState([])
	const [eventsToNotBeListed, setEventsToNotBeListed] = useState([])
	
	// In the first render
	
	useEffect(() => {
		async function fetchData() {
		
		try{
			const {data} = await calendrierApi.get(`/users/${userId}`)
			const eventsArray = []
			const rejectedEventsArray = []

			data.events.map(item => {
			if (item.year === inputYear){
				eventsArray.push(item)
			}

			else {
				rejectedEventsArray.push(item)
			}

			setEventsToBeListed([...eventsArray])
			setEventsToNotBeListed([...rejectedEventsArray])

			return item //Only to the React don't warn

			})

			setUserInfo({_id: data._id, nickname: data.nickname})

		}

		catch(err){
			console.error(err)
			alert("Erro - A reiniciar pagina")

			window.location.href = `/`
		}
		}

		fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId])


	// Next renders
	const renderEvents = useCallback(() => {
		async function fetchData() {
		
			try{
				const {data} = await calendrierApi.get(`/users/${userId}`)
				let eventsArray = data.events
				let rejectedEventsArray = []


				// Year Filter
				if (inputMonth === ""){
					eventsArray = data.events.filter(item => (item.year === inputYear))
					rejectedEventsArray = data.events.filter(item => (item.year !== inputYear))
				}

				// Month Filter
				else if (inputMonth !== "" && inputDay === 0){
					eventsArray = data.events.filter(item => (item.year === inputYear && item.month === inputMonth))
					rejectedEventsArray = data.events.filter(item => (item.year !== inputYear || item.month !== inputMonth))
				}

				// Day Filter
				else if (inputDay !== 0){
					eventsArray = data.events.filter(item => (item.year === inputYear && item.month === inputMonth && item.day === inputDay))
					rejectedEventsArray = data.events.filter(item => (item.year !== inputYear || item.month !== inputMonth || item.day !== inputDay))
				}


				// sort array
				const sortedArray = []

				// By Month
				eventsArray.sort((first, second) => {

					if (monthConverterToNumber(first.month) > monthConverterToNumber(second.month)) {
						return 1;
					}

					if (monthConverterToNumber(first.month) < monthConverterToNumber(second.month)) {
						return -1;
					}

					// a must be equal to b
					return 0;
				})

				for (let month = 1; month <= 12; month++){

					let monthArray = []

					monthArray = eventsArray.filter(item => (monthConverterToNumber(item.month) === month))

					// By Day
					monthArray.sort((first, second) => {

						if (first.day > second.day) {
							return 1;
						}

						if (first.day < second.day) {
							return -1;
						}

						// a must be equal to b
						return 0;
					})

					let cleanMonthArray = []

					for (let day = 0; day <= new Date(inputYear, month, 0).getDate(); day++){
						let dayArray = []
	
						dayArray = monthArray.filter(item => (item.day === day))
	
						// By Day
						dayArray.sort((first, second) => {
	
							if (convertHourToMinutes(first.time) > convertHourToMinutes(second.time)) {
								return 1;
							}
	
							if (convertHourToMinutes(first.time) < convertHourToMinutes(second.time)) {
								return -1;
							}
	
							// a must be equal to b
							return 0;

							
						})	

						cleanMonthArray.push(...dayArray)
	
					}

					
					sortedArray.push(...cleanMonthArray)

				}


				setEventsToBeListed(sortedArray)
				setEventsToNotBeListed(rejectedEventsArray)
		
			}
	
			catch(err){
				console.error(err)
				alert("Erro - A reiniciar pagina")
	
				window.location.href = `/`
			}
			}
	
			fetchData()
	}, [inputYear, inputMonth, inputDay, userId])

	useEffect(() => {

		renderEvents()
			
	}, [renderEvents])

	const deleteEvent = async index => {
		const newEventsArray = eventsToBeListed

		newEventsArray.splice(index, 1)

		setEventsToBeListed(newEventsArray)

		try{
			await calendrierApi.put(`/users/${userId}`, {...userInfo, events: [...eventsToBeListed, ...eventsToNotBeListed]})

			renderEvents()
		}

		catch(err){
			console.warn(err)
		}
		
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
					onChange={e => {handleChangeYearInput(e.target.value)}}
				/>

				<select
					id="monthInput"
					className="input"

					value={inputMonth}
					onChange={e => {handleChangeMonthInput(e.target.value)}}
				>

				<option value="" >Every month</option>

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
					<option value="" >Every days</option>
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
				{eventsToBeListed.map((item, index) => (
					<EventItem
						key={index}
						info={{...item, index: index}}
						deleteEvent={deleteEvent}
					/>
				))}
			</main>

    </div>

    </>
  );
}

export default connect(state => ({eventManagerData: state.eventManager}))(EventManager);