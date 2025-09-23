import axios from "axios"

const api = axios.create({
    baseURL:"https://profilegrid.onrender.com",
    headers:{"Content-Type":"application/json"},
    timeout:5000,
})

export default api;