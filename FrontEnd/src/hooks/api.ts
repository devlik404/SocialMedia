import axios from "axios"

export const ApiData = axios.create({
    baseURL:"http://localhost:5000/api/v1"
    
})