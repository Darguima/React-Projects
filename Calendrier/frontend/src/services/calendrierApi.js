import axios from "axios"

const calendrierApi = axios.create({baseURL: "http://localhost:3001/api"})

export default calendrierApi
