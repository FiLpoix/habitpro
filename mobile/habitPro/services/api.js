import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.19.14.105:8000',
})

export default api;