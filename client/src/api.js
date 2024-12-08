// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getAvailableBooks = () => axios.get(`${API_URL}/books/available`);
export const getCheckedOutBooks = () => axios.get(`${API_URL}/books/checked-out`);
export const checkOutBook = (id, data) => axios.post(`${API_URL}/books/check-out/${id}`, data);
export const checkInBook = (id) => axios.post(`${API_URL}/books/check-in/${id}`);