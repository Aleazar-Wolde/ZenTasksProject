// frontend/src/pages/Settings.jsx
import React from 'react';
import { Container, Typography } from '@mui/material';

function Setting() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Typography>
        This is the settings page where you can customize your ZenTasks experience.
      </Typography>
    </Container>
  );
}

export default Setting;
