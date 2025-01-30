import React from 'react';

const AIRecommendations = ({ tasks }) => {
  // Simulate AI recommendations (replace with actual API call)
  const recommendations = tasks
    .filter((task) => task.status === 'TODO')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 3);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">AI Recommendations</h2>
      {recommendations.map((task) => (
        <div key={task.id} className="bg-white p-4 rounded-lg shadow mb-4">
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="text-gray-600">Due: {task.dueDate}</p>
        </div>
      ))}
    </div>
  );
};

export default AIRecommendations;