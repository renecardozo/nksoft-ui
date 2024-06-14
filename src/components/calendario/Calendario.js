import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { getEventConfig, getEvents } from './service'
// import timeGridPlugin from '@fullcalendar/timegrid'

// import '@fullcalendar/core/main.css'
// import '@fullcalendar/daygrid/main.css'
// import '@fullcalendar/timegrid/main.css'

import eventsData from './events'

function Calendario() {
  const [events, setEvents] = useState([])
  const [eventsConfig, setEventsConfig] = useState([])
  const getData = async () => {
    const data = await getEvents()
    const configs = await getEventConfig()
    const eventList =
      data && data.length
        ? data.map((d) => {
            return {
              title: d.descripcion,
              start: d.fecha,
              backgroundColor: configs.find((item) => item.code === d.codigo).hexColor,
              allDay: true,
              // textColor: 'black',
            }
          })
        : []
    setEvents(eventList)
    console.log(eventsData)
  }

  // {
  //   title: 'AZUL +5',
  //   start: getDate('YEAR-MONTH-22'),
  //   backgroundColor: 'red',
  //   textColor: 'black',
  // },
  useEffect(() => {
    getData()
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
