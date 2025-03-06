import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  Toolbar,
} from '@mui/material';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

// Example statuses
const STATUS_OPTIONS = ['TODO', 'IN_PROGRESS', 'DONE'];

function AdvancedTasksDashboard() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'TODO',
    dueDate: '',
  });

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get('/api/tasks')
      .then((res) => setTasks(res.data))
      .catch((err) => console.error('Error fetching tasks:', err));
  };

  // Create a new task
  const handleAddTask = () => {
    axios
      .post('/api/tasks', newTask)
      .then((res) => {
        setAddDialogOpen(false);
        setNewTask({ title: '', description: '', status: 'TODO', dueDate: '' });
        fetchTasks();
      })
      .catch((err) => console.error('Error adding task:', err));
  };

  // Delete a task
  const handleDeleteTask = (id) => {
    axios
      .delete(`/api/tasks/${id}`)
      .then(() => {
        fetchTasks();
      })
      .catch((err) => console.error('Error deleting task:', err));
  };

  // Called when the user finishes editing a cell (inline)
  const handleCellEditCommit = (params) => {
    // params contains { id, field, value, ... }
    // We'll find the updated row from tasks
    const taskId = params.id;
    const updatedField = params.field;
    const newValue = params.value;

    const taskToUpdate = tasks.find((t) => t.id === taskId);
    if (!taskToUpdate) return;

    // Update the local object
    const updatedTask = { ...taskToUpdate, [updatedField]: newValue };

    // If we updated the status or dueDate, we might need to do extra validation
    // For simplicity, let's just do an axios PUT
    axios
      .put(`/api/tasks/${taskId}`, updatedTask)
      .then(() => {
        fetchTasks();
      })
      .catch((err) => console.error('Error updating task:', err));
  };

  // DataGrid columns
  const columns = [
    { field: 'id', headerName: 'ID', width: 70, sortable: true },
    {
      field: 'title',
      headerName: 'Title',
      width: 200,
      editable: true, // allows inline editing
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 250,
      editable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      editable: true,
      // Optionally, you can use a select editor with "valueOptions"
      // If using DataGridPro or Premium, you can have a more advanced cell editor
      // For the free version, you can just do inline text editing
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      width: 150,
      editable: true,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const rowId = params.id;
        return (
          <Box>
            <IconButton onClick={() => handleDeleteTask(rowId)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Advanced Manage Tasks Dashboard
      </Typography>

      {/* Custom Toolbar with Quick Filter and "Add Task" button */}
      <Toolbar disableGutters sx={{ mb: 1, justifyContent: 'space-between' }}>
        <Box>
          <GridToolbarQuickFilter
            quickFilterParser={(searchInput) => searchInput.split(/\s+/)}
          />
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setAddDialogOpen(true)}
        >
          Add Task
        </Button>
      </Toolbar>

      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={tasks}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          // Inline editing
          editMode="cell"
          onCellEditCommit={handleCellEditCommit}
        />
      </Box>

      {/* Dialog for adding a new task */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            fullWidth
            required
          />
          <TextField
            label="Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            fullWidth
            required
          />
          <TextField
            label="Status"
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            fullWidth
            required
          />
          <TextField
            label="Due Date"
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddTask}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdvancedTasksDashboard;
