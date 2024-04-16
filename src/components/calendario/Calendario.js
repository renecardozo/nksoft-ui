import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
// import timeGridPlugin from "@fullcalendar/timegrid";

// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";

// import events from './events'

function Calendario() {
  const [events, setEvents] = useState([])
  const getEvents = async () => {
    const { data } = await axios.get('http://localhost:8000/api/v1/event')
    const eventList = data.map((d) => {
      return {
        title: d.descripcion,
        start: d.fecha,
        backgroundColor: '#5856d6',
        allDay: true,
        // textColor: 'black',
      }
    })
    setEvents(eventList)
    console.log(data)
  }

  // {
  //   title: 'AZUL +5',
  //   start: getDate('YEAR-MONTH-22'),
  //   backgroundColor: 'red',
  //   textColor: 'black',
  // },
  useEffect(() => {
    getEvents()
  }, [])
  let firstDaty = 1

  return (
    <div>
      <FullCalendar
        defaultView="dayGridMonth"
        firstDay={firstDaty}
        locale="es"
        header={{
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        themeSystem="Simplex"
        plugins={[dayGridPlugin]}
        events={events}
      />
    </div>
  )
}

// function getDate(dayString) {
//   const today = new Date(dayString)
//   const year = today.getFullYear().toString()
//   const month = (today.getMonth() + 1).toString()
//   const date = today.getDate().toString()

//   if (month.length === 1) {
//     month = '0' + month
//   }

//   return `${year}-${month}-${date}`
// }

export default Calendario
