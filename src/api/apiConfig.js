import axios from "axios";

// Create an axios instance with your base URL
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // Replace this with your API's base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
