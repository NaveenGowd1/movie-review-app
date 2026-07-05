import axios from "axios";

const api = axios.create({
    baseURL: "https://movie-review-app-f0ic.onrender.com/",
});

export default api;