import React from 'react';
import { Container, Typography } from '@mui/material';

function Calendar() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Calendar View
      </Typography>
      <Typography>
        This is where the calendar will be displayed. You can integrate a calendar library (e.g., react-big-calendar) here.
      </Typography>
    </Container>
  );
}

export default Calendar;
