import React from 'react';

import  './styles.css';

function EventSpace({eventsOfTheMonth, day}) {

	const eventsOfTheDay = []

	eventsOfTheMonth.map((item) => {

		if (item.day === day){
			eventsOfTheDay.push(item)
		}

        return item //Only to the React don't warn
	})

	var eventInSingular_Plural;

	if (eventsOfTheDay.length === 1)
		eventInSingular_Plural = "event"
	
	else eventInSingular_Plural = "events"

	return (
		<div id="EventSpaceContainer">
			<p>
				{eventsOfTheDay.length} {eventInSingular_Plural}
			</p>
		</div>
		);
	}

export default EventSpace;
