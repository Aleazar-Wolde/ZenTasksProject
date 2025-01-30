// frontend/src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Import MUI components (if using Material-UI) or use plain HTML/CSS as preferred
import { Container, Typography, Grid, Paper, Button } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function Dashboard() {
  // State for tasks and AI predictions
  const [tasks, setTasks] = useState([]);
  const [aiPrediction, setAiPrediction] = useState(null);

  // Fetch tasks from the back end
  useEffect(() => {
    axios
      .get('/api/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  // Function to get AI prediction for a sample task (or the next upcoming task)
  const fetchAiPrediction = () => {
    // For demonstration, pick the description from the first task or a hard-coded value
    const description = tasks.length > 0 ? tasks[0].description : 'Write a report for Q1';
    axios
      .post('/api/ai/predict', { description })
      .then((response) => {
        setAiPrediction(response.data);
      })
      .catch((error) => {
        console.error('Error fetching AI prediction:', error);
      });
  };

  // Prepare data for the chart (for example, count tasks by status)
  const chartData = {
    labels: ['TODO', 'IN_PROGRESS', 'DONE'],
    datasets: [
      {
        label: 'Number of Tasks',
        data: [
          tasks.filter((task) => task.status === 'TODO').length,
          tasks.filter((task) => task.status === 'IN_PROGRESS').length,
          tasks.filter((task) => task.status === 'DONE').length,
        ],
        backgroundColor: ['#f44336', '#ff9800', '#4caf50'],
      },
    ],
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        ZenTasks Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Task List */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '1rem' }}>
            <Typography variant="h6">Task List</Typography>
            {tasks.length === 0 ? (
              <Typography>No tasks available.</Typography>
            ) : (
              <ul>
                {tasks.map((task) => (
                  <li key={task.id}>
                    <strong>{task.title}</strong> - {task.status} - Due: {task.due_date}
                  </li>
                ))}
              </ul>
            )}
          </Paper>
        </Grid>

        {/* AI Prediction Panel */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '1rem' }}>
            <Typography variant="h6">AI Prediction</Typography>
            <Button variant="contained" color="primary" onClick={fetchAiPrediction}>
              Get Prediction
            </Button>
            {aiPrediction && (
              <div style={{ marginTop: '1rem' }}>
                <Typography>
                  Predicted Duration: {aiPrediction.predictedDuration} minutes
                </Typography>
                <Typography variant="body2">{aiPrediction.details}</Typography>
              </div>
            )}
          </Paper>
        </Grid>

        {/* Chart for Task Statistics */}
        <Grid item xs={12}>
          <Paper style={{ padding: '1rem' }}>
            <Typography variant="h6" gutterBottom>
              Task Statistics
            </Typography>
            <Bar data={chartData} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
