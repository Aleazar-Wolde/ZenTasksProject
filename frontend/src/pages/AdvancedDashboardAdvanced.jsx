// frontend/src/pages/AdvancedDashboardAdvanced.jsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Tabs,
  Tab,
  Container,
  Paper,
  Button,
  Grid,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsIcon from '@mui/icons-material/Settings';
import { DataGrid } from '@mui/x-data-grid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Bar, Line, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { io } from 'socket.io-client';

// Register ChartJS components (required in Chart.js v3+)
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const drawerWidth = 240;

function AdvancedDashboardAdvanced() {
  // Sidebar state and view selection
  const [mobileOpen, setMobileOpen] = useState(false);
  const [view, setView] = useState('grid'); // 'grid', 'kanban', or 'charts'
  const [tasks, setTasks] = useState([]);
  const [kanbanColumns, setKanbanColumns] = useState({
    TODO: [],
    IN_PROGRESS: [],
    DONE: []
  });
  const [aiPrediction, setAiPrediction] = useState(null);

  // Real-time notifications (simulated)
  const [notifications, setNotifications] = useState([]);

  // Socket for real-time updates (assuming backend emits 'taskUpdate' events)
  useEffect(() => {
    const socket = io('http://localhost:8080');
    socket.on('taskUpdate', (update) => {
      setNotifications(prev => [...prev, update]);
      fetchTasks();
    });
    return () => socket.disconnect();
  }, []);

  // Fetch tasks from backend
  const fetchTasks = useCallback(() => {
    axios.get('/api/tasks')
      .then((response) => {
        setTasks(response.data);
        setKanbanColumns({
          TODO: response.data.filter(task => task.status === 'TODO'),
          IN_PROGRESS: response.data.filter(task => task.status === 'IN_PROGRESS'),
          DONE: response.data.filter(task => task.status === 'DONE'),
        });
      })
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Handle view switching via Tabs
  const handleViewChange = (event, newValue) => {
    setView(newValue);
  };

  // Toggle sidebar drawer
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // DataGrid columns for Grid view
  const gridColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'due_date', headerName: 'Due Date', width: 150 },
  ];

  // Kanban view: handle drag and drop
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceColumn = [...kanbanColumns[source.droppableId]];
    const destColumn = source.droppableId === destination.droppableId ? sourceColumn : [...kanbanColumns[destination.droppableId]];
    const [movedTask] = sourceColumn.splice(source.index, 1);
    movedTask.status = destination.droppableId;
    destColumn.splice(destination.index, 0, movedTask);

    setKanbanColumns({
      ...kanbanColumns,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    });

    // Optionally update backend
    axios.put(`/api/tasks/${movedTask.id}`, movedTask)
      .then(() => console.log('Task updated'))
      .catch(error => console.error('Error updating task:', error));
  };

  // AI Prediction: call backend to get prediction based on task description
  const fetchAiPrediction = (description) => {
    axios.post('/api/ai/predict', { description })
      .then(response => setAiPrediction(response.data))
      .catch(error => console.error('Error fetching AI prediction:', error));
  };

  // Chart data for tasks by status
  const barChartData = {
    labels: ['TODO', 'IN_PROGRESS', 'DONE'],
    datasets: [{
      label: 'Tasks by Status',
      data: [
        tasks.filter(task => task.status === 'TODO').length,
        tasks.filter(task => task.status === 'IN_PROGRESS').length,
        tasks.filter(task => task.status === 'DONE').length,
      ],
      backgroundColor: ['#f44336', '#ff9800', '#4caf50'],
    }],
  };

  const lineChartData = {
    labels: tasks.map((_, index) => `Task ${index + 1}`),
    datasets: [{
      label: 'Duration Trend',
      data: tasks.map(() => Math.floor(Math.random() * 100)), // Replace with real trend data
      fill: false,
      borderColor: '#3e95cd',
      tension: 0.1,
    }],
  };

  const pieChartData = {
    labels: ['TODO', 'IN_PROGRESS', 'DONE'],
    datasets: [{
      data: [
        tasks.filter(task => task.status === 'TODO').length,
        tasks.filter(task => task.status === 'IN_PROGRESS').length,
        tasks.filter(task => task.status === 'DONE').length,
      ],
      backgroundColor: ['#f44336', '#ff9800', '#4caf50'],
    }],
  };

  // Sidebar drawer content
  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6">ZenTasks</Typography>
      </Toolbar>
      <Divider />
      <List>
        {[
          { text: 'Dashboard', icon: <DashboardIcon /> },
          { text: 'Tasks', icon: <AssignmentIcon /> },
          { text: 'Calendar', icon: <CalendarTodayIcon /> },
          { text: 'Settings', icon: <SettingsIcon /> },
        ].map((item) => (
          <ListItem button key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  // Render view based on selected tab
  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar Header */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            ZenTasks Advanced Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { width: drawerWidth } }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { width: drawerWidth } }}
        open
      >
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container maxWidth="lg">
          {/* View Tabs */}
          <Tabs value={view} onChange={handleViewChange} textColor="primary" indicatorColor="primary" sx={{ mb: 3 }}>
            <Tab value="grid" label="Grid View" />
            <Tab value="kanban" label="Kanban View" />
            <Tab value="charts" label="Charts" />
          </Tabs>

          {/* Grid View */}
          {view === 'grid' && (
            <Paper sx={{ height: 500, width: '100%' }}>
              <DataGrid rows={tasks} columns={gridColumns} pageSize={10} rowsPerPageOptions={[5, 10, 20]} checkboxSelection />
            </Paper>
          )}

          {/* Kanban View */}
          {view === 'kanban' && (
            <DragDropContext onDragEnd={onDragEnd}>
              <Grid container spacing={2}>
                {Object.keys(kanbanColumns).map((status) => (
                  <Grid item xs={12} md={4} key={status}>
                    <Paper sx={{ p: 2, minHeight: 300 }}>
                      <Typography variant="h6" gutterBottom>{status}</Typography>
                      <Droppable droppableId={status}>
                        {(provided) => (
                          <Box ref={provided.innerRef} {...provided.droppableProps} sx={{ minHeight: 250 }}>
                            {kanbanColumns[status].map((task, index) => (
                              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                {(provided, snapshot) => (
                                  <Paper
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    sx={{
                                      p: 1,
                                      mb: 1,
                                      backgroundColor: snapshot.isDragging ? 'lightblue' : 'white',
                                    }}
                                  >
                                    <Typography variant="subtitle1">{task.title}</Typography>
                                    <Typography variant="body2">{task.description}</Typography>
                                    <Button variant="outlined" size="small" sx={{ mt: 1 }} onClick={() => fetchAiPrediction(task.description)}>
                                      Predict Duration
                                    </Button>
                                  </Paper>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </Box>
                        )}
                      </Droppable>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </DragDropContext>
          )}

          {/* Charts View */}
          {view === 'charts' && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>Task Status (Bar Chart)</Typography>
                  <Bar data={barChartData} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>Task Trend (Line Chart)</Typography>
                  <Line data={lineChartData} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>Task Distribution (Pie Chart)</Typography>
                  <Pie data={pieChartData} />
                </Paper>
              </Grid>
            </Grid>
          )}

          {/* AI Prediction Detail */}
          {aiPrediction && (
            <Paper sx={{ p: 2, mt: 3 }}>
              <Typography variant="h6">AI Prediction Detail</Typography>
              <Typography>Predicted Duration: {aiPrediction.predictedDuration} minutes</Typography>
              <Typography variant="body2">{aiPrediction.details}</Typography>
            </Paper>
          )}
        </Container>
      </Box>
    </Box>
  );
}

export default AdvancedDashboardAdvanced;
