import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProgressChart = ({ tasks }) => {
  const data = {
    labels: ['Completed', 'In Progress', 'To Do'],
    datasets: [
      {
        label: 'Tasks',
        data: [
          tasks.filter((task) => task.status === 'DONE').length,
          tasks.filter((task) => task.status === 'IN_PROGRESS').length,
          tasks.filter((task) => task.status === 'TODO').length,
        ],
        backgroundColor: ['#10B981', '#3B82F6', '#EF4444'],
      },
    ],
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Progress Chart</h2>
      <Bar data={data} />
    </div>
  );
};

export default ProgressChart;