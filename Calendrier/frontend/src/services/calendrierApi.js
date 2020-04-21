import axios from "axios"

const calendrierApi = axios.create({baseURL: "http://dsgdevbraga.ddns.net:3001/api"})
// RP_server: 192.168.1.60
// mg_server: 10.42.0.152
// localhost: 192.168.1.9
// External acess: dsgdevbraga.ddns.net

export default calendrierApi
