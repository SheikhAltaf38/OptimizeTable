import axios from "axios"
const environment = import.meta.env.VITE_ENV;

const api = axios.create({
    baseURL: environment === "dev" ? "http://localhost:4000": "https://profilegrid.onrender.com",
    headers:{"Content-Type":"application/json"},
    timeout:5000,
})

export default api;