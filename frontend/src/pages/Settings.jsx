// frontend/src/pages/Settings.jsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, FormControlLabel, Checkbox, MenuItem, Select, InputLabel, TextField, Button, Box } from '@mui/material';
import axios from 'axios';

function Settings() {
  const [theme, setTheme] = useState('light');
  const [defaultView, setDefaultView] = useState('grid');
  const [notifications, setNotifications] = useState(true);
  useEffect(() => {
    // fetch existing settings from back end
    axios.get('/api/settings')
      .then(res => {
        const data = res.data;
        setTheme(data.theme);
        setDefaultView(data.defaultView);
        setNotifications(data.notifications);
      })
      .catch(err => console.error('Error fetching settings:', err));
  }, []);
  
  const handleSave = (e) => {
    e.preventDefault();
    const newSettings = { theme, defaultView, notifications };
    axios.put('/api/settings', newSettings)
      .then(res => {
        alert('Settings saved!');
      })
      
      .catch(err => console.error('Error saving settings:', err));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Settings</Typography>
      <Box component="form" onSubmit={handleSave} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
        {/* Theme select */}
        <div>
          <InputLabel>Theme</InputLabel>
          <Select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            fullWidth
          >
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
          </Select>
        </div>
        
        {/* Default View */}
        <div>
          <InputLabel>Default View</InputLabel>
          <Select
            value={defaultView}
            onChange={(e) => setDefaultView(e.target.value)}
            fullWidth
          >
            <MenuItem value="grid">Grid</MenuItem>
            <MenuItem value="kanban">Kanban</MenuItem>
            <MenuItem value="charts">Charts</MenuItem>
          </Select>
        </div>

        {/* Notifications */}
        <FormControlLabel
          control={
            <Checkbox
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
          }
          label="Enable Notifications"
        />
        <Button type="submit" variant="contained">Save Settings</Button>
      </Box>
    </Container>
  );
}

export default Settings;
