// frontend/src/pages/Calendar.jsx
import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { parse, startOfWeek, getDay, format } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // default styles
import axios from 'axios';

// For date-fns localizer
const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format, 
  parse, 
  startOfWeek, 
  getDay, 
  locales,
});

function CalendarPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // On mount, fetch tasks from backend, transform them into calendar events
    axios.get('/api/tasks')
      .then(response => {
        const tasks = response.data;
        // Convert tasks to Big Calendar "events"
        const calendarEvents = tasks.map(task => ({
          id: task.id,
          title: task.title,
          // For Big Calendar, start & end are Date objects
          start: new Date(task.dueDate), 
          end: new Date(task.dueDate),   // if you only store a single date in tasks
          allDay: true,                 // set allDay if you only have one date
        }));
        setEvents(calendarEvents);
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  // Optional: handle select or navigate
  const handleSelectEvent = (event) => {
    alert(`Selected event:\n${event.title}`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Calendar View
      </Typography>
      
      <div style={{ height: 600, marginTop: 20 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          onSelectEvent={handleSelectEvent}
          // Additional props like onNavigate, defaultView, etc.
        />
      </div>
    </Container>
  );
}

export default CalendarPage;
