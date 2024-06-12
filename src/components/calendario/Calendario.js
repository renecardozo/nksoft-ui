import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
// import timeGridPlugin from "@fullcalendar/timegrid";

// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";

// import events from './events'
const codigoList = [
  {
    name: 'Feriado Institucional',
    code: 'COD_0001',
    color: 'primary',
    hexColor: '#6261cc',
  },
  {
    name: 'Feriado Local',
    code: 'COD_0002',
    color: 'info',
    hexColor: '#3d99f',
  },
  {
    name: 'Feriado Nacional',
    code: 'COD_0003',
    color: 'success',
    hexColor: '#249542',
  },
  {
    name: 'Foraneo',
    code: 'COD_0004',
    color: 'secondary',
    hexColor: '#6b7785',
  },
]

function Calendario() {
  const [events, setEvents] = useState([])
  const getEvents = async () => {
    const { data } = await axios.get(`${process.env.PATH_API}/api/v1/event`)
    const eventList = data.map((d) => {
      return {
        title: d.descripcion,
        start: d.fecha,
        backgroundColor: codigoList.find((item) => item.code === d.codigo).hexColor,
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
