import axios from 'axios';

const axiosSets = {
  baseURL: 'http://127.0.0.1:5000/api'
};

const apiInstance = axios.create(axiosSets);

export const createTask = task => apiInstance.post('/tasks', task);

export const getTasks = () => apiInstance.get('/tasks');

export const updateTask = (id, task) => apiInstance.patch(`/tasks/${id}`, task);

export const deleteTask = id => apiInstance.delete(`/tasks/${id}`);
