import axios from 'axios';

const api = axios.create({
    baseUrl: 'http://10.19.14.105:8000',
})

export default api;