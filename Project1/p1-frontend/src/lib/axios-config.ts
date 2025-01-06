import axios from "axios"

export const axiosAuthInstance = axios.create({
    //baseURL:import.meta.env.VITE_API_AUTH,
    baseURL:"http://localhost:8080/auth",
    withCredentials: true,
    headers:{
        "Content-Type": "application/json",
    }
});

export const axiosUserInstance = axios.create({
    baseURL:"http://localhost:8080/user",
    withCredentials: true,
    headers:{
        "Content-Type": "application/json",
    }
});

export const axiosAdminInstance = axios.create({
    baseURL:"http://localhost:8080/admin",
    withCredentials: true,
    headers:{
        "Content-Type": "application/json",
    }
});