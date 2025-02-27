// frontend/src/pages/Tasks.jsx

import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });

  // Fetch tasks from the backend
  const fetchTasks = () => {
    axios.get('/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a new task
  const handleAddTask = (e) => {W
    e.preventDefault();
    // Assuming status defaults to "TODO"
    const taskToAdd = { ...newTask, status: 'TODO' };
    axios.post('/api/tasks', taskToAdd)
      .then(response => {
        fetchTasks(); // refresh task list
        setNewTask({ title: '', description: '', dueDate: '' });
      })
      .catch(error => console.error('Error adding task:', error));
  };

  // Delete a task
  const handleDeleteTask = (id) => {
    axios.delete(`/api/tasks/${id}`)
      .then(response => fetchTasks())
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Tasks
      </Typography>
      <Box component="form" onSubmit={handleAddTask} sx={{ mb: 4 }}>
        <TextField
          label="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Due Date"
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Add Task
        </Button>
      </Box>
      <Typography variant="h5" gutterBottom>
        Task List
      </Typography>
      <List>
        {tasks.map(task => (
          <ListItem key={task.id} secondaryAction={
            <IconButton edge="end" onClick={() => handleDeleteTask(task.id)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText
              primary={task.title}
              secondary={`Description: ${task.description} | Due: ${new Date(task.dueDate).toLocaleDateString()}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
export default Tasks;
