import axios from "axios"

const api = axios.create({
	//baseURL: "http://dsgdevbraga.ddns.net:3001"
	baseURL: "http://192.168.1.59:3001"
})

export default api
