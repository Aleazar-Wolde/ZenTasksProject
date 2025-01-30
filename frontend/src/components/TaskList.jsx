// File: frontend/src/TaskList.js
import React, { useEffect, useState } from 'react';

function TaskList() {
  // useState hook to hold the tasks fetched from the API
  const [tasks, setTasks] = useState([]);

  // useEffect hook to fetch tasks when the component is first rendered
  useEffect(() => {
    // The fetch() call makes a GET request to the back end
    fetch('http://localhost:8080/api/tasks')
      .then(response => {
        // Check if the response is OK, then convert it to JSON
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Set the tasks state with the data returned from the back end
        setTasks(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);  // Empty dependency array means this effect runs once after the component mounts

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map(task => (
          // For each task, create a list item displaying the title and description
          <li key={task.id}>
            <strong>{task.title}</strong>: {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
