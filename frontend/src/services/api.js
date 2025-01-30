import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/tasks', // Replace with your Spring Boot API URL
});

export default api;