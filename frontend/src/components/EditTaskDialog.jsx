import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import axios from 'axios';

function EditTaskDialog({ open, onClose, task, onTaskUpdated }) {
  const [updatedTask, setUpdatedTask] = useState({ ...task });

  useEffect(() => {
    setUpdatedTask({ ...task });
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    axios.put(`/api/tasks/${task.id}`, updatedTask)
      .then(response => {
        onTaskUpdated(response.data);
        onClose();
      })
      .catch(error => console.error('Error updating task:', error));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Title"
          name="title"
          value={updatedTask.title || ''}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Description"
          name="description"
          value={updatedTask.description || ''}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Status"
          name="status"
          value={updatedTask.status || ''}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Due Date"
          name="dueDate"
          type="date"
          value={updatedTask.dueDate ? updatedTask.dueDate.substring(0,10) : ''}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditTaskDialog;
