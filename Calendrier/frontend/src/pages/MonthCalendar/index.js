import React from 'react';

import { MonthCalendarContainer } from './styles';

export default function MonthCalendar(props) {
  const month = props.match.params.monthName
  return (
  <MonthCalendarContainer>{month}</MonthCalendarContainer>
  )
}
