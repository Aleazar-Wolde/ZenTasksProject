// frontend/src/components/TaskForm.jsx
import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/tasks', { title, description, dueDate, status: 'TODO' })
      .then(response => {
        onTaskAdded(response.data);
        setTitle('');
        setDescription('');
        setDueDate('');
      })
      .catch(error => console.error('Error adding task:', error));
  };

  return (
    <Container>
      <Typography variant="h5">Add New Task</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Task
        </Button>
      </form>
    </Container>
  );
}

export default TaskForm;
