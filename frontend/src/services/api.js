import axios from 'axios';

const api = axios.create({
  
  baseURL: 'https://achados-api.onrender.com/api/itens', 
});

export default api;